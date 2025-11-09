import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../db';
import { users, sessions } from '../db/schema';
import { eq, and, ne } from 'drizzle-orm';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';
import { authenticate } from '../middleware/auth';
import { sendEmailVerification, verifyEmailToken, resendEmailVerification } from '../utils/emailVerification';
import { sendSMSVerification, verifySMSCode, markPhoneAsVerified } from '../utils/smsVerification';
import passport from '../config/passport';

const router = Router();

// Validation schemas
const registerSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  role: z.enum(['client', 'worker']).default('client'),
  phone: z.string().optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar los términos y condiciones',
  }),
});

const loginSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
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
        error: 'Ya existe un usuario con este correo electrónico',
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
        termsAccepted: validatedData.termsAccepted,
        termsAcceptedAt: new Date(),
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
      id: newUser.id,
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

    // Send email verification
    await sendEmailVerification(newUser.id, newUser.email);

    res.status(201).json({
      success: true,
      data: {
        user: newUser,
        token,
      },
      message: 'Registration successful. Please check your email to verify your account.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: 'Error de validación',
        details: error.errors,
      });
      return;
    }

    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'No se pudo registrar el usuario',
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
        error: 'Correo electrónico o contraseña incorrectos',
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

    // Check if user has a password (OAuth users might not have one)
    if (!user.passwordHash) {
      res.status(401).json({
        success: false,
        error: 'This account uses social login. Please sign in with Google.',
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
        error: 'Correo electrónico o contraseña incorrectos',
      });
      return;
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      id: user.id,
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
        error: 'Error de validación',
        details: error.errors,
      });
      return;
    }

    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'No se pudo iniciar sesión',
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
          eq(sessions.userId, req.user!.userId!)
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
      error: 'No se pudo cerrar sesión',
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
      where: eq(users.id, req.user!.userId!),
      columns: {
        passwordHash: false, // Exclude password hash
      },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        error: 'Usuario no encontrado',
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
      error: 'No se pudo obtener la información del usuario',
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
        eq(sessions.userId, req.user!.userId!),
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
      error: 'No se pudieron obtener las sesiones',
    });
  }
});

/**
 * GET /api/auth/verify-email
 * Verify email address using token from verification email
 */
router.get('/verify-email', async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.query;

    if (!token || typeof token !== 'string') {
      res.status(400).json({
        success: false,
        error: 'Se requiere el token de verificación',
      });
      return;
    }

    const result = await verifyEmailToken(token);

    if (result.success) {
      res.json({
        success: true,
        message: result.message,
        data: { userId: result.userId },
      });
    } else {
      res.status(400).json({
        success: false,
        error: result.message,
      });
    }
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      error: 'No se pudo verificar el correo electrónico',
    });
  }
});

/**
 * POST /api/auth/resend-verification
 * Resend email verification to current user (protected route)
 */
router.post('/resend-verification', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await resendEmailVerification(req.user!.userId!);

    if (result.success) {
      res.json({
        success: true,
        message: result.message,
      });
    } else {
      res.status(400).json({
        success: false,
        error: result.message,
      });
    }
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({
      success: false,
      error: 'No se pudo reenviar el correo de verificación',
    });
  }
});

/**
 * GET /api/auth/google
 * Initiate Google OAuth flow
 * Note: prompt: 'select_account' forces Google to show account picker even if already logged in
 */
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
    prompt: 'select_account', // Force account selection screen
  })
);

/**
 * GET /api/auth/google/callback
 * Google OAuth callback - creates JWT and redirects to frontend
 */
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login?error=oauth_failed` }),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user = req.user as any;

      if (!user) {
        res.redirect(`${process.env.FRONTEND_URL}/login?error=no_user`);
        return;
      }

      // Generate JWT token
      const token = generateToken({
        userId: user.id as string,
        id: user.id as string,
        email: user.email as string,
        role: user.role as 'client' | 'worker' | 'admin' | 'support',
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

      // Redirect to frontend with token and user info
      // Frontend will handle storing token and checking if terms need to be accepted
      const redirectUrl = new URL(`${process.env.FRONTEND_URL}/auth/callback`);
      redirectUrl.searchParams.set('token', token);
      redirectUrl.searchParams.set('termsAccepted', user.termsAccepted.toString());
      redirectUrl.searchParams.set('profileCompleted', user.profileCompleted.toString());

      res.redirect(redirectUrl.toString());
    } catch (error) {
      console.error('Google OAuth callback error:', error);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=callback_failed`);
    }
  }
);

/**
 * POST /api/auth/send-sms-verification
 * Send SMS verification code (authenticated users only)
 */
router.post('/send-sms-verification', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId!;

    // Get user phone number
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      res.status(404).json({
        success: false,
        error: 'Usuario no encontrado',
      });
      return;
    }

    if (!user.phone) {
      res.status(400).json({
        success: false,
        error: 'No hay un número de teléfono asociado a esta cuenta',
      });
      return;
    }

    if (user.phoneVerified) {
      res.status(400).json({
        success: false,
        error: 'El número de teléfono ya está verificado',
      });
      return;
    }

    // Send SMS verification
    const result = await sendSMSVerification(user.phone);

    if (result.success) {
      res.json({
        success: true,
        message: result.message,
      });
    } else {
      res.status(400).json({
        success: false,
        error: result.message,
      });
    }
  } catch (error) {
    console.error('Send SMS verification error:', error);
    res.status(500).json({
      success: false,
      error: 'No se pudo enviar el código de verificación por SMS',
    });
  }
});

/**
 * POST /api/auth/verify-sms
 * Verify SMS code
 */
const verifySMSSchema = z.object({
  code: z.string().length(6, 'El código debe tener 6 dígitos'),
});

router.post('/verify-sms', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId!;
    const validatedData = verifySMSSchema.parse(req.body);

    // Get user phone number
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      res.status(404).json({
        success: false,
        error: 'Usuario no encontrado',
      });
      return;
    }

    if (!user.phone) {
      res.status(400).json({
        success: false,
        error: 'No hay un número de teléfono asociado a esta cuenta',
      });
      return;
    }

    if (user.phoneVerified) {
      res.status(400).json({
        success: false,
        error: 'El número de teléfono ya está verificado',
      });
      return;
    }

    // Verify the code
    const result = await verifySMSCode(user.phone, validatedData.code);

    if (result.success) {
      // Mark phone as verified in database
      await markPhoneAsVerified(userId);

      res.json({
        success: true,
        message: result.message,
      });
    } else {
      res.status(400).json({
        success: false,
        error: result.message,
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: 'Error de validación',
        details: error.errors,
      });
      return;
    }

    console.error('Verify SMS error:', error);
    res.status(500).json({
      success: false,
      error: 'No se pudo verificar el código SMS',
    });
  }
});

/**
 * POST /api/auth/accept-terms
 * Accept terms and conditions (authenticated users only)
 */
router.post('/accept-terms', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId!;

    // Update user to mark terms as accepted
    await db
      .update(users)
      .set({
        termsAccepted: true,
        termsAcceptedAt: new Date(),
      })
      .where(eq(users.id, userId));

    res.json({
      success: true,
      message: 'Terms accepted successfully',
    });
  } catch (error) {
    console.error('Accept terms error:', error);
    res.status(500).json({
      success: false,
      error: 'No se pudieron aceptar los términos',
    });
  }
});

/**
 * POST /api/auth/complete-profile
 * Complete user profile with additional information
 */
const completeProfileSchema = z.object({
  firstName: z.string().min(1, 'El nombre es requerido'),
  lastName: z.string().min(1, 'El apellido es requerido'),
  phone: z.string().regex(/^\+\d{1,4}\d{6,14}$/, 'El teléfono debe estar en formato internacional (ej: +52 55 1234 5678)'),
});

router.post('/complete-profile', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId!;
    const validatedData = completeProfileSchema.parse(req.body);

    // NOTE: For MVP, we allow multiple users with the same phone for testing purposes
    // In production, you may want to enable phone uniqueness validation

    // Update user profile with phone number (but don't mark as complete yet - need SMS verification)
    await db
      .update(users)
      .set({
        phone: validatedData.phone,
        phoneVerified: false, // Will be set to true after SMS verification
      })
      .where(eq(users.id, userId));

    // Send SMS verification code
    const smsResult = await sendSMSVerification(validatedData.phone);

    if (!smsResult.success) {
      res.status(500).json({
        success: false,
        error: 'No se pudo enviar el código de verificación. Por favor intenta de nuevo.',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Código de verificación enviado a tu WhatsApp',
      data: {
        phone: validatedData.phone,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: 'Error de validación',
        details: error.errors,
      });
      return;
    }

    console.error('Complete profile error:', error);
    res.status(500).json({
      success: false,
      error: 'No se pudo completar el perfil',
    });
  }
});

export default router;
