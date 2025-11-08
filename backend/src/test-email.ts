import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

// Load environment variables
dotenv.config();

async function testEmail() {
  try {
    console.log('📧 Testing email service...');
    console.log('Environment check:');
    console.log(`- API Key from env: ${process.env.SENDGRID_API_KEY}`);
    console.log(`- API Key exists: ${!!process.env.SENDGRID_API_KEY}`);
    console.log(`- API Key starts with SG: ${process.env.SENDGRID_API_KEY?.startsWith('SG.')}`);
    console.log(`- API Key length: ${process.env.SENDGRID_API_KEY?.length}`);
    console.log(`- From Email: ${process.env.SENDGRID_FROM_EMAIL}`);
    console.log('');

    // Use API key from environment
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      throw new Error('SENDGRID_API_KEY not configured in environment');
    }
    console.log(`Setting API key from environment (length: ${apiKey.length})`);
    sgMail.setApiKey(apiKey);

    console.log(`Sending to: jp.pietrini.sanchez@gmail.com`);

    const msg = {
      to: 'jp.pietrini.sanchez@gmail.com',
      from: 'info@trustme.mx',
      subject: 'Test Email from TrustMe',
      text: 'This is a test email',
      html: '<strong>This is a test email</strong>',
    };

    await sgMail.send(msg);

    console.log('✅ Test email sent successfully!');
    console.log('Check your inbox at jp.pietrini.sanchez@gmail.com');
  } catch (error: any) {
    console.error('❌ Failed to send test email:', error);
    if (error.response) {
      console.error('Response:', error.response.body);
    }
  }
}

testEmail();
