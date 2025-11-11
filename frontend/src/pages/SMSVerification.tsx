import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button, Card, Input } from '../components/ui';

export function SMSVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, sendSMSCode, verifySMSCode, refreshUser } = useAuth();

  // Check if coming from complete profile flow
  const fromCompleteProfile = location.state?.fromCompleteProfile;
  const phoneFromState = location.state?.phone;

  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [channel, setChannel] = useState<'sms' | 'whatsapp'>('whatsapp'); // Default to WhatsApp
  const [codeSent, setCodeSent] = useState(false);

  // Redirect if user doesn't need phone verification
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // If already verified, redirect to home
    if (user.phoneVerified) {
      navigate('/', { replace: true });
      return;
    }

    // If not coming from complete profile flow and not a worker, redirect home
    if (!fromCompleteProfile && user.role !== 'worker') {
      navigate('/', { replace: true });
      return;
    }
  }, [user, navigate, fromCompleteProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsVerifying(true);

    try {
      const result = await verifySMSCode(code);

      if (result.success) {
        setSuccess(true);
        setError('');

        // Refresh user data to get updated phoneVerified and profileCompleted status
        await refreshUser();

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate('/', { replace: true });
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

  const handleSendCode = async () => {
    setIsSending(true);
    setError('');
    setResendSuccess(false);

    try {
      const result = await sendSMSCode(channel);

      if (result.success) {
        setCodeSent(true);
        setResendSuccess(true);
        setTimeout(() => setResendSuccess(false), 5000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Error al enviar el código');
    } finally {
      setIsSending(false);
    }
  };

  const handleResend = async () => {
    setIsSending(true);
    setError('');
    setResendSuccess(false);

    try {
      const result = await sendSMSCode(channel);

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

  // Don't render if no user or if user is already verified
  if (!user || user.phoneVerified) {
    return null;
  }

  // Don't render if not from complete profile and not a worker
  if (!fromCompleteProfile && user.role !== 'worker') {
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
        ) : !codeSent ? (
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
                Enviaremos un código de verificación a:
              </p>
              <p className="text-sky-500 font-medium mb-4">{phoneFromState || user.phone}</p>
              <p className="text-sm text-gray-600">
                Elige cómo quieres recibir el código
              </p>
            </div>

            {/* Channel Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Método de verificación
              </label>
              <div className="grid grid-cols-2 gap-3">
                {/* WhatsApp Option */}
                <button
                  type="button"
                  onClick={() => setChannel('whatsapp')}
                  className={`
                    relative flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all
                    ${channel === 'whatsapp'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                    }
                  `}
                >
                  {/* WhatsApp Icon */}
                  <svg
                    className={`w-8 h-8 mb-2 ${channel === 'whatsapp' ? 'text-green-600' : 'text-gray-600'}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span className={`text-sm font-medium ${channel === 'whatsapp' ? 'text-green-700' : 'text-gray-700'}`}>
                    WhatsApp
                  </span>
                  {channel === 'whatsapp' && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>

                {/* SMS Option */}
                <button
                  type="button"
                  onClick={() => setChannel('sms')}
                  className={`
                    relative flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all
                    ${channel === 'sms'
                      ? 'border-sky-500 bg-sky-50'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                    }
                  `}
                >
                  {/* SMS Icon */}
                  <svg
                    className={`w-8 h-8 mb-2 ${channel === 'sms' ? 'text-sky-600' : 'text-gray-600'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <span className={`text-sm font-medium ${channel === 'sms' ? 'text-sky-700' : 'text-gray-700'}`}>
                    SMS
                  </span>
                  {channel === 'sms' && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-sky-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Send Code Button */}
            <Button
              onClick={handleSendCode}
              fullWidth
              disabled={isSending}
              className="mb-3"
            >
              {isSending ? 'Enviando...' : `Enviar código por ${channel === 'whatsapp' ? 'WhatsApp' : 'SMS'}`}
            </Button>
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
                Hemos enviado un código de verificación a tu {channel === 'whatsapp' ? 'WhatsApp' : 'SMS'}:
              </p>
              <p className="text-sky-500 font-medium mb-4">{phoneFromState || user.phone}</p>
              <p className="text-sm text-gray-600">
                Por favor ingresa el código de 6 dígitos que recibiste.
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
                <li>• Revisa tus mensajes de {channel === 'whatsapp' ? 'WhatsApp' : 'SMS'}</li>
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
              {isSending ? 'Reenviando...' : `Reenviar código por ${channel === 'whatsapp' ? 'WhatsApp' : 'SMS'}`}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
