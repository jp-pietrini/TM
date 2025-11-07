import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../db';
import { users, sessions } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';
import { authenticate } from '../middleware/auth';

const router = Router();

// Validation schemas
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['client', 'worker']).default('client'),
  phone: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

/**
 * POST /api/auth/register
 * Register a new user (client or worker)
 */
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request body
    const validatedData = registerSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, validatedData.email),
    });

    if (existingUser) {
      res.status(400).json({
        success: false,
        error: 'User with this email already exists',
      });
      return;
    }

    // Hash password
    const passwordHash = await hashPassword(validatedData.password);

    // Create user
    const [newUser] = await db
      .insert(users)
      .values({
        email: validatedData.email,
        passwordHash,
        role: validatedData.role,
        phone: validatedData.phone,
        emailVerified: false,
        phoneVerified: false,
        isActive: true,
        profileCompleted: false,
        // Workers need approval, clients are auto-approved
        isApproved: validatedData.role === 'client',
      })
      .returning({
        id: users.id,
        email: users.email,
        role: users.role,
        emailVerified: users.emailVerified,
        phoneVerified: users.phoneVerified,
        profileCompleted: users.profileCompleted,
        isApproved: users.isApproved,
        createdAt: users.createdAt,
      });

    // Generate JWT token
    const token = generateToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });

    // Create session
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await db.insert(sessions).values({
      userId: newUser.id,
      token,
      expiresAt,
      userAgent: req.headers['user-agent'] || null,
      ipAddress: req.ip || null,
      isValid: true,
    });

    res.status(201).json({
      success: true,
      data: {
        user: newUser,
        token,
      },
      message: 'Registration successful',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: error.errors,
      });
      return;
    }

    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to register user',
    });
  }
});

/**
 * POST /api/auth/login
 * Login an existing user
 */
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request body
    const validatedData = loginSchema.parse(req.body);

    // Find user by email
    const user = await db.query.users.findFirst({
      where: eq(users.email, validatedData.email),
    });

    if (!user) {
      res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
      return;
    }

    // Check if account is active
    if (!user.isActive) {
      res.status(403).json({
        success: false,
        error: 'Account is inactive. Please contact support.',
      });
      return;
    }

    // Check if account is suspended
    if (user.isSuspended) {
      const suspensionMessage = user.suspendedUntil
        ? `Account is suspended until ${user.suspendedUntil.toLocaleDateString()}`
        : 'Account is suspended';

      res.status(403).json({
        success: false,
        error: suspensionMessage,
        reason: user.suspensionReason,
      });
      return;
    }

    // Verify password
    const isPasswordValid = await comparePassword(
      validatedData.password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
      return;
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Create session
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await db.insert(sessions).values({
      userId: user.id,
      token,
      expiresAt,
      userAgent: req.headers['user-agent'] || null,
      ipAddress: req.ip || null,
      isValid: true,
    });

    // Update last login time
    await db
      .update(users)
      .set({ lastLoginAt: new Date() })
      .where(eq(users.id, user.id));

    // Return user data (exclude sensitive fields)
    const { passwordHash, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token,
      },
      message: 'Login successful',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: error.errors,
      });
      return;
    }

    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to login',
    });
  }
});

/**
 * POST /api/auth/logout
 * Logout the current user (revoke session)
 */
router.post('/logout', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      res.status(400).json({
        success: false,
        error: 'No token provided',
      });
      return;
    }

    // Revoke session
    await db
      .update(sessions)
      .set({
        isValid: false,
        revokedAt: new Date(),
      })
      .where(
        and(
          eq(sessions.token, token),
          eq(sessions.userId, req.user!.userId)
        )
      );

    res.json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to logout',
    });
  }
});

/**
 * GET /api/auth/me
 * Get current user information (protected route)
 */
router.get('/me', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch fresh user data from database
    const user = await db.query.users.findFirst({
      where: eq(users.id, req.user!.userId),
      columns: {
        passwordHash: false, // Exclude password hash
      },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        error: 'User not found',
      });
      return;
    }

    res.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get user information',
    });
  }
});

/**
 * GET /api/auth/sessions
 * Get all active sessions for current user (protected route)
 */
router.get('/sessions', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const userSessions = await db.query.sessions.findMany({
      where: and(
        eq(sessions.userId, req.user!.userId),
        eq(sessions.isValid, true)
      ),
      columns: {
        id: true,
        userAgent: true,
        ipAddress: true,
        createdAt: true,
        lastActivityAt: true,
        expiresAt: true,
      },
      orderBy: (sessions, { desc }) => [desc(sessions.lastActivityAt)],
    });

    res.json({
      success: true,
      data: { sessions: userSessions },
    });
  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get sessions',
    });
  }
});

export default router;
