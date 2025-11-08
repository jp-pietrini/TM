import React, { useState } from 'react';
import { PhoneVerification, Card } from '../components/ui';
import { Mail, MessageSquare, Shield } from 'lucide-react';

export const VerificationDemo: React.FC = () => {
  const [smsVerified, setSmsVerified] = useState(false);
  const [whatsappVerified, setWhatsappVerified] = useState(false);
  const [error, setError] = useState('');

  const handleSmsVerified = (phoneNumber: string) => {
    console.log('SMS verified:', phoneNumber);
    setSmsVerified(true);
    setError('');
  };

  const handleWhatsAppVerified = (phoneNumber: string) => {
    console.log('WhatsApp verified:', phoneNumber);
    setWhatsappVerified(true);
    setError('');
  };

  const handleError = (errorMessage: string) => {
    console.error('Verification error:', errorMessage);
    setError(errorMessage);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Phone Verification Demo
          </h1>
          <p className="text-gray-600">
            Test SMS and WhatsApp verification with Twilio Verify
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="bg-red-50 border-red-200">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                  <span className="text-white text-xs">!</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-red-900">Verification Error</p>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* SMS Verification */}
          <Card>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">SMS Verification</h2>
                  <p className="text-sm text-gray-600">Verify via SMS message</p>
                </div>
              </div>

              {!smsVerified ? (
                <PhoneVerification
                  channel="sms"
                  onVerified={handleSmsVerified}
                  onError={handleError}
                />
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-900">Verified!</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    SMS verification completed successfully
                  </p>
                  <button
                    onClick={() => setSmsVerified(false)}
                    className="mt-4 text-sm text-sky-600 hover:text-sky-700"
                  >
                    Test again
                  </button>
                </div>
              )}
            </div>
          </Card>

          {/* WhatsApp Verification */}
          <Card>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">WhatsApp Verification</h2>
                  <p className="text-sm text-gray-600">Verify via WhatsApp</p>
                </div>
              </div>

              {!whatsappVerified ? (
                <PhoneVerification
                  channel="whatsapp"
                  onVerified={handleWhatsAppVerified}
                  onError={handleError}
                />
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-900">Verified!</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    WhatsApp verification completed successfully
                  </p>
                  <button
                    onClick={() => setWhatsappVerified(false)}
                    className="mt-4 text-sm text-sky-600 hover:text-sky-700"
                  >
                    Test again
                  </button>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Email Templates Info */}
        <Card className="bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <Mail className="w-5 h-5 text-sky-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Email Templates</h2>
                <p className="text-sm text-gray-600">Available email templates via SendGrid</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-sky-200">
                <h3 className="font-semibold text-gray-900 mb-2">Welcome Email</h3>
                <p className="text-sm text-gray-600">
                  Sent to new users upon registration. Includes role-specific onboarding steps
                  and a free credit for workers.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-sky-200">
                <h3 className="font-semibold text-gray-900 mb-2">Email Verification</h3>
                <p className="text-sm text-gray-600">
                  Sends a 6-digit verification code to verify user email addresses.
                  Code expires in 15 minutes.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-sky-200">
                <h3 className="font-semibold text-gray-900 mb-2">Password Reset</h3>
                <p className="text-sm text-gray-600">
                  Contains a secure link to reset forgotten passwords. Link expires in 1 hour.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-sky-200">
                <h3 className="font-semibold text-gray-900 mb-2">New Lead Notification</h3>
                <p className="text-sm text-gray-600">
                  Notifies workers when they receive a new lead from potential clients.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-sky-200">
                <h3 className="font-semibold text-gray-900 mb-2">Refund Notification</h3>
                <p className="text-sm text-gray-600">
                  Confirms when a refund has been processed and credited to the user's wallet.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Technical Info */}
        <Card className="bg-blue-50 border-blue-200">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-blue-900">
              Technical Implementation
            </h3>
            <div className="text-xs text-blue-800 space-y-2">
              <p>
                <strong>Twilio Verify:</strong> Used for SMS and WhatsApp verification with automatic
                code generation, delivery, and expiration handling. Supports multiple channels including
                SMS, WhatsApp, voice calls, and email.
              </p>
              <p>
                <strong>SendGrid:</strong> Powers all transactional emails with beautiful HTML templates.
                All emails are responsive and optimized for mobile devices.
              </p>
              <p>
                <strong>Security:</strong> Verification codes expire after 15 minutes for email and 10 minutes
                for SMS/WhatsApp. Phone numbers are formatted to E.164 international standard.
              </p>
              <p>
                <strong>Features:</strong> Auto-focus on code inputs, auto-submit when complete, resend
                cooldown timer, haptic feedback, and comprehensive error handling.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
