import dotenv from 'dotenv';
import path from 'path';
import { verifyCode } from './services/sms';

// Load environment variables explicitly from the .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function testVerify() {
  try {
    console.log('🔐 Testing SMS code verification...\n');

    const phoneNumber = '+12135749293';
    const code = '200986';

    console.log(`📱 Phone: ${phoneNumber}`);
    console.log(`🔢 Code: ${code}\n`);

    const result = await verifyCode(phoneNumber, code);

    console.log('\n✅ Verification Result:');
    console.log(`Valid: ${result.valid}`);
    console.log(`Message: ${result.message}`);

    if (result.valid) {
      console.log('\n🎉 SUCCESS! Phone number verified!');
    } else {
      console.log('\n❌ Verification failed');
    }

  } catch (error: any) {
    console.error('\n❌ ERROR verifying code:', error.message);
  }
}

testVerify();
