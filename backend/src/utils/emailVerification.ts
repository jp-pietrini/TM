import crypto from 'crypto';
import { db } from '../db';
import { userVerifications, users } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { sendEmail } from './email';

/**
 * Generate a secure verification token
 */
export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Create email verification token and send verification email
 */
export async function sendEmailVerification(userId: string, email: string): Promise<void> {
  // Generate token
  const token = generateVerificationToken();

  // Set expiration to 24 hours from now
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  // Store token in database
  await db.insert(userVerifications).values({
    userId,
    type: 'email',
    token,
    expiresAt,
  });

  // Create verification URL
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  // Send verification email
  await sendEmail({
    to: email,
    subject: 'Verify your TrustMe email address',
    template: 'email-verification',
    data: {
      verificationUrl,
      email,
    },
  });
}

/**
 * Verify email token and mark email as verified
 */
export async function verifyEmailToken(token: string): Promise<{ success: boolean; message: string; userId?: string }> {
  try {
    // Find verification record
    const [verification] = await db
      .select()
      .from(userVerifications)
      .where(
        and(
          eq(userVerifications.token, token),
          eq(userVerifications.type, 'email'),
          eq(userVerifications.isUsed, false)
        )
      )
      .limit(1);

    if (!verification) {
      return {
        success: false,
        message: 'Invalid or expired verification token',
      };
    }

    // Check if token is expired
    if (new Date() > verification.expiresAt) {
      return {
        success: false,
        message: 'Verification token has expired',
      };
    }

    // Mark token as used
    await db
      .update(userVerifications)
      .set({
        isUsed: true,
        usedAt: new Date(),
      })
      .where(eq(userVerifications.id, verification.id));

    // Mark user email as verified
    await db
      .update(users)
      .set({
        emailVerified: true,
      })
      .where(eq(users.id, verification.userId));

    return {
      success: true,
      message: 'Email verified successfully',
      userId: verification.userId,
    };
  } catch (error) {
    console.error('Error verifying email token:', error);
    return {
      success: false,
      message: 'An error occurred during verification',
    };
  }
}

/**
 * Resend email verification
 */
export async function resendEmailVerification(userId: string): Promise<{ success: boolean; message: string }> {
  try {
    // Get user
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    if (user.emailVerified) {
      return {
        success: false,
        message: 'Email already verified',
      };
    }

    // Mark all previous email verification tokens as used
    await db
      .update(userVerifications)
      .set({ isUsed: true })
      .where(
        and(
          eq(userVerifications.userId, userId),
          eq(userVerifications.type, 'email')
        )
      );

    // Send new verification email
    await sendEmailVerification(userId, user.email);

    return {
      success: true,
      message: 'Verification email sent',
    };
  } catch (error) {
    console.error('Error resending verification email:', error);
    return {
      success: false,
      message: 'Failed to send verification email',
    };
  }
}
