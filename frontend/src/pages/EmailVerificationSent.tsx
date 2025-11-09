import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button, Card } from '../components/ui';

export function EmailVerificationSent() {
  const location = useLocation();
  const { resendVerificationEmail } = useAuth();

  const email = location.state?.email || '';
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState('');

  const handleResend = async () => {
    setIsResending(true);
    setResendError('');
    setResendSuccess(false);

    try {
      const result = await resendVerificationEmail();

      if (result.success) {
        setResendSuccess(true);
        setTimeout(() => setResendSuccess(false), 5000);
      } else {
        setResendError(result.message);
      }
    } catch (error) {
      setResendError('Error al reenviar el correo. Intenta nuevamente.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <Card className="w-full max-w-md p-8">
        {/* Email Icon */}
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">
          ¡Revisa tu correo electrónico!
        </h1>

        {/* Message */}
        <div className="text-center mb-6">
          <p className="text-gray-700 mb-2">
            Hemos enviado un enlace de verificación a:
          </p>
          <p className="text-sky-500 font-medium mb-4">{email}</p>
          <p className="text-sm text-gray-600">
            Por favor, haz clic en el enlace del correo para verificar tu cuenta y completar el registro.
          </p>
        </div>

        {/* Success/Error Messages */}
        {resendSuccess && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              ✓ Correo de verificación reenviado exitosamente
            </p>
          </div>
        )}

        {resendError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{resendError}</p>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700 font-medium mb-2">
            Consejos:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Revisa tu carpeta de correo no deseado (spam)</li>
            <li>• El enlace expira en 24 horas</li>
            <li>• Si no recibes el correo, puedes solicitar uno nuevo</li>
          </ul>
        </div>

        {/* Resend Button */}
        <Button
          onClick={handleResend}
          variant="outline"
          fullWidth
          disabled={isResending || resendSuccess}
          className="mb-4"
        >
          {isResending ? 'Reenviando...' : 'Reenviar correo de verificación'}
        </Button>

        {/* Back to Login */}
        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-sky-500 hover:text-sky-600 font-medium"
          >
            ← Volver al inicio de sesión
          </Link>
        </div>
      </Card>
    </div>
  );
}
