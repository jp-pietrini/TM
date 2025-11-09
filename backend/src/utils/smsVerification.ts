import twilio from 'twilio';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const VERIFY_SERVICE_SID = process.env.TWILIO_VERIFY_SERVICE_SID;

/**
 * Send SMS verification code to a phone number
 */
export async function sendSMSVerification(phoneNumber: string): Promise<{ success: boolean; message: string }> {
  try {
    if (!VERIFY_SERVICE_SID) {
      console.error('Twilio Verify Service SID not configured');
      return { success: false, message: 'SMS verification service not configured' };
    }

    // Format phone number for Twilio (must include country code)
    // If it doesn't start with +, assume Mexico (+52)
    const formattedPhone = phoneNumber.startsWith('+')
      ? phoneNumber
      : `+52${phoneNumber.replace(/\D/g, '')}`;

    // Send verification code using Twilio Verify
    const verification = await twilioClient.verify.v2
      .services(VERIFY_SERVICE_SID)
      .verifications.create({
        to: formattedPhone,
        channel: 'sms',
      });

    if (verification.status === 'pending') {
      return {
        success: true,
        message: 'Código de verificación enviado por SMS',
      };
    }

    return {
      success: false,
      message: 'No se pudo enviar el código de verificación',
    };
  } catch (error) {
    console.error('Error sending SMS verification:', error);

    // Handle Twilio-specific errors
    if (error instanceof Error) {
      if (error.message.includes('unverified')) {
        return {
          success: false,
          message: 'Este número no está verificado en modo de desarrollo',
        };
      }
      if (error.message.includes('invalid')) {
        return {
          success: false,
          message: 'Número de teléfono inválido',
        };
      }
    }

    return {
      success: false,
      message: 'Error al enviar código de verificación',
    };
  }
}

/**
 * Verify SMS code
 */
export async function verifySMSCode(
  phoneNumber: string,
  code: string
): Promise<{ success: boolean; message: string }> {
  try {
    if (!VERIFY_SERVICE_SID) {
      console.error('Twilio Verify Service SID not configured');
      return { success: false, message: 'SMS verification service not configured' };
    }

    // Format phone number
    const formattedPhone = phoneNumber.startsWith('+')
      ? phoneNumber
      : `+52${phoneNumber.replace(/\D/g, '')}`;

    // Verify the code using Twilio Verify
    const verificationCheck = await twilioClient.verify.v2
      .services(VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to: formattedPhone,
        code: code,
      });

    if (verificationCheck.status === 'approved') {
      return {
        success: true,
        message: 'Teléfono verificado exitosamente',
      };
    }

    return {
      success: false,
      message: 'Código de verificación incorrecto o expirado',
    };
  } catch (error) {
    console.error('Error verifying SMS code:', error);

    if (error instanceof Error) {
      if (error.message.includes('not found')) {
        return {
          success: false,
          message: 'Código de verificación expirado',
        };
      }
      if (error.message.includes('expired')) {
        return {
          success: false,
          message: 'Código de verificación expirado',
        };
      }
    }

    return {
      success: false,
      message: 'Error al verificar el código',
    };
  }
}

/**
 * Mark user's phone as verified in database
 * Also marks profile as complete since phone verification is the last step
 */
export async function markPhoneAsVerified(userId: string): Promise<void> {
  await db
    .update(users)
    .set({
      phoneVerified: true,
      profileCompleted: true, // Mark profile as complete after phone verification
    })
    .where(eq(users.id, userId));
}

/**
 * Check if user needs phone verification (workers only)
 */
export async function needsPhoneVerification(userId: string): Promise<boolean> {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user) return false;

  // Only workers need phone verification
  if (user.role !== 'worker') return false;

  // Check if already verified
  return !user.phoneVerified;
}
