import twilio from 'twilio';

// Initialize Twilio client - lazy load to ensure env is loaded
let twilioClient: twilio.Twilio | null = null;

function getTwilioClient(): twilio.Twilio {
  if (!twilioClient) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    if (!accountSid || !authToken) {
      throw new Error('Twilio credentials not configured');
    }
    twilioClient = twilio(accountSid, authToken);
  }
  return twilioClient;
}

function getVerifySid(): string {
  const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID;
  if (!verifySid) {
    throw new Error('Twilio Verify Service SID not configured');
  }
  return verifySid;
}

export type VerificationChannel = 'sms' | 'whatsapp' | 'call' | 'email';

/**
 * Send verification code via SMS or WhatsApp
 * @param phoneNumber Phone number in E.164 format (e.g., +521234567890)
 * @param channel Verification channel (sms, whatsapp, call, email)
 * @param locale Language locale (e.g., 'es' for Spanish, 'en' for English)
 */
export async function sendVerificationCode(
  phoneNumber: string,
  channel: VerificationChannel = 'sms',
  locale: string = 'es'
): Promise<{ success: boolean; message: string }> {
  try {
    const client = getTwilioClient();
    const verifySid = getVerifySid();

    const verification = await client.verify.v2
      .services(verifySid)
      .verifications.create({
        to: phoneNumber,
        channel: channel,
        locale: locale,
      });

    console.log(`✅ Verification code sent via ${channel} to ${phoneNumber}`);
    console.log(`Status: ${verification.status}`);

    return {
      success: true,
      message: `Verification code sent via ${channel}`,
    };
  } catch (error: any) {
    console.error('❌ Failed to send verification code:', error);
    throw new Error(error.message || 'Failed to send verification code');
  }
}

/**
 * Verify the code entered by the user
 * @param phoneNumber Phone number in E.164 format
 * @param code Verification code entered by user
 */
export async function verifyCode(
  phoneNumber: string,
  code: string
): Promise<{ success: boolean; valid: boolean; message: string }> {
  try {
    const client = getTwilioClient();
    const verifySid = getVerifySid();

    const verificationCheck = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({
        to: phoneNumber,
        code: code,
      });

    console.log(`✅ Verification check for ${phoneNumber}`);
    console.log(`Status: ${verificationCheck.status}`);

    const isValid = verificationCheck.status === 'approved';

    return {
      success: true,
      valid: isValid,
      message: isValid ? 'Phone number verified successfully' : 'Invalid verification code',
    };
  } catch (error: any) {
    console.error('❌ Failed to verify code:', error);

    // Handle specific Twilio errors
    if (error.code === 20404) {
      return {
        success: true,
        valid: false,
        message: 'Verification code expired or not found',
      };
    }

    throw new Error(error.message || 'Failed to verify code');
  }
}

/**
 * Format phone number to E.164 format
 * Assumes Mexican numbers if no country code provided
 * @param phoneNumber Phone number (can be with or without country code)
 */
export function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-digit characters
  let cleaned = phoneNumber.replace(/\D/g, '');

  // If starts with 52 (Mexico code) and has correct length, add +
  if (cleaned.startsWith('52') && cleaned.length === 12) {
    return `+${cleaned}`;
  }

  // If 10 digits, assume Mexican number, add +52
  if (cleaned.length === 10) {
    return `+52${cleaned}`;
  }

  // If already has + at start in original, use cleaned with +
  if (phoneNumber.startsWith('+')) {
    return `+${cleaned}`;
  }

  // Default: assume it needs +52 (Mexico)
  return `+52${cleaned}`;
}

/**
 * Validate phone number format
 */
export function isValidPhoneNumber(phoneNumber: string): boolean {
  const formatted = formatPhoneNumber(phoneNumber);
  // E.164 format: + followed by 1-15 digits
  return /^\+[1-9]\d{1,14}$/.test(formatted);
}
