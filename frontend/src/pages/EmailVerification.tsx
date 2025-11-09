import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card, Spinner, Button } from '../components/ui';

export function EmailVerification() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();

  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setMessage('Token de verificación no encontrado en la URL');
      return;
    }

    const verify = async () => {
      try {
        const result = await verifyEmail(token);

        if (result.success) {
          setStatus('success');
          setMessage(result.message);

          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate('/login', {
              state: { message: 'Email verificado exitosamente. Ahora puedes iniciar sesión.' }
            });
          }, 3000);
        } else {
          setStatus('error');
          setMessage(result.message);
        }
      } catch (error) {
        setStatus('error');
        setMessage('Error al verificar el correo electrónico');
      }
    };

    verify();
  }, [searchParams, verifyEmail, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <Card className="w-full max-w-md p-8">
        {status === 'verifying' && (
          <div className="text-center">
            <Spinner className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Verificando tu correo electrónico
            </h2>
            <p className="text-gray-600">
              Por favor espera un momento...
            </p>
          </div>
        )}

        {status === 'success' && (
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
              ¡Correo verificado!
            </h2>
            <p className="text-gray-700 mb-6">
              {message || 'Tu correo electrónico ha sido verificado exitosamente.'}
            </p>

            <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-sky-800">
                Redirigiendo al inicio de sesión en 3 segundos...
              </p>
            </div>

            <Button
              onClick={() => navigate('/login')}
              fullWidth
            >
              Ir al inicio de sesión
            </Button>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Error de verificación
            </h2>
            <p className="text-gray-700 mb-6">
              {message || 'No pudimos verificar tu correo electrónico.'}
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800 font-medium mb-2">
                Posibles causas:
              </p>
              <ul className="text-sm text-yellow-700 text-left space-y-1">
                <li>• El enlace de verificación ha expirado (24 horas)</li>
                <li>• El enlace ya fue usado anteriormente</li>
                <li>• El token de verificación es inválido</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => navigate('/email-verification-sent')}
                fullWidth
              >
                Solicitar nuevo enlace de verificación
              </Button>

              <Link
                to="/login"
                className="block text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Volver al inicio de sesión
              </Link>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
