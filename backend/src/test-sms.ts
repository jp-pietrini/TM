import dotenv from 'dotenv';
import path from 'path';
import { sendVerificationCode } from './services/sms';

// Load environment variables explicitly from the .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function testSMS() {
  try {
    console.log('🚀 Testing SMS verification in Spanish...\n');

    // Debug: Verify environment variables are loaded
    if (!process.env.TWILIO_VERIFY_SERVICE_SID) {
      throw new Error('TWILIO_VERIFY_SERVICE_SID not found in environment');
    }
    console.log('✓ Environment variables loaded successfully\n');

    const phoneNumber = '+12135749293'; // 213-574-9293 formatted as E.164

    console.log(`📱 Sending verification code to: ${phoneNumber}`);
    console.log('🌐 Language: Spanish (es)');
    console.log('📨 Channel: SMS\n');

    const result = await sendVerificationCode(phoneNumber, 'sms', 'es');

    console.log('\n✅ SUCCESS!');
    console.log(`Message: ${result.message}`);
    console.log('\n📬 Check your phone for the verification code!');
    console.log('💡 The message should be in Spanish.');

  } catch (error: any) {
    console.error('\n❌ ERROR sending SMS:', error.message);
    if (error.code) {
      console.error(`Error code: ${error.code}`);
    }
    if (error.moreInfo) {
      console.error(`More info: ${error.moreInfo}`);
    }
  }
}

testSMS();
