import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button, Card, Input } from '../components/ui';

export function SMSVerification() {
  const navigate = useNavigate();
  const { user, sendSMSCode, verifySMSCode } = useAuth();

  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  // Auto-send SMS on component mount
  useEffect(() => {
    const sendInitialSMS = async () => {
      try {
        await sendSMSCode();
      } catch (error) {
        console.error('Failed to send initial SMS:', error);
      }
    };

    // Only send if user is authenticated and not phone verified
    if (user && !user.phoneVerified) {
      sendInitialSMS();
    }
  }, [user, sendSMSCode]);

  // Redirect if user doesn't need phone verification
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Only workers need phone verification
    if (user.role !== 'worker') {
      navigate('/');
      return;
    }

    // If already verified, redirect
    if (user.phoneVerified) {
      navigate('/');
      return;
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsVerifying(true);

    try {
      const result = await verifySMSCode(code);

      if (result.success) {
        setSuccess(true);
        setError('');

        // Redirect after 2 seconds
        setTimeout(() => {
          // Check if profile is completed, redirect accordingly
          if (user?.profileCompleted) {
            navigate('/');
          } else {
            navigate('/complete-profile');
          }
        }, 2000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Error al verificar el código');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsSending(true);
    setError('');
    setResendSuccess(false);

    try {
      const result = await sendSMSCode();

      if (result.success) {
        setResendSuccess(true);
        setTimeout(() => setResendSuccess(false), 5000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Error al reenviar el código');
    } finally {
      setIsSending(false);
    }
  };

  if (!user || user.role !== 'worker' || user.phoneVerified) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <Card className="w-full max-w-md p-8">
        {success ? (
          <div className="text-center">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              ¡Teléfono verificado!
            </h2>
            <p className="text-gray-700 mb-6">
              Tu número de teléfono ha sido verificado exitosamente.
            </p>

            <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-sky-800">
                Redirigiendo en 2 segundos...
              </p>
            </div>
          </div>
        ) : (
          <div>
            {/* Phone Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-sky-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            {/* Header */}
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">
              Verificación de teléfono
            </h1>

            {/* Message */}
            <div className="text-center mb-6">
              <p className="text-gray-700 mb-2">
                Hemos enviado un código de verificación a tu número de teléfono:
              </p>
              <p className="text-sky-500 font-medium mb-4">{user.phone}</p>
              <p className="text-sm text-gray-600">
                Por favor ingresa el código de 6 dígitos que recibiste por SMS.
              </p>
            </div>

            {/* Success/Error Messages */}
            {resendSuccess && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  ✓ Código de verificación reenviado exitosamente
                </p>
              </div>
            )}

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Verification Form */}
            <form onSubmit={handleSubmit} className="mb-6">
              <Input
                type="text"
                label="Código de verificación"
                value={code}
                onChange={(e) => {
                  // Only allow numbers and limit to 6 digits
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setCode(value);
                }}
                placeholder="000000"
                maxLength={6}
                className="text-center text-2xl tracking-widest mb-4"
                required
              />

              <Button
                type="submit"
                fullWidth
                disabled={isVerifying || code.length !== 6}
                className="mb-3"
              >
                {isVerifying ? 'Verificando...' : 'Verificar teléfono'}
              </Button>
            </form>

            {/* Instructions */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700 font-medium mb-2">
                Consejos:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• El código expira en 10 minutos</li>
                <li>• Revisa tus mensajes SMS</li>
                <li>• Si no recibes el código, puedes solicitar uno nuevo</li>
              </ul>
            </div>

            {/* Resend Button */}
            <Button
              onClick={handleResend}
              variant="outline"
              fullWidth
              disabled={isSending || resendSuccess}
            >
              {isSending ? 'Reenviando...' : 'Reenviar código SMS'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
