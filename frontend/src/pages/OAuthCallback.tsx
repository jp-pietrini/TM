import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Spinner } from '../components/ui';

export function OAuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { handleOAuthCallback } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processCallback = async () => {
      try {
        const token = searchParams.get('token');
        const termsAccepted = searchParams.get('termsAccepted') === 'true';
        const profileCompleted = searchParams.get('profileCompleted') === 'true';

        if (!token) {
          setError('Token de autenticación no encontrado');
          setTimeout(() => navigate('/login?error=oauth_failed'), 2000);
          return;
        }

        // Complete OAuth login
        await handleOAuthCallback(token, termsAccepted, profileCompleted);

        // Check if user needs to accept terms or complete profile
        if (!termsAccepted) {
          navigate('/accept-terms', { replace: true });
        } else if (!profileCompleted) {
          navigate('/complete-profile', { replace: true });
        } else {
          // User is fully onboarded, redirect to dashboard
          navigate('/perfil', { replace: true });
        }
      } catch (err) {
        console.error('OAuth callback error:', err);
        setError('Error al completar la autenticación');
        setTimeout(() => navigate('/login?error=oauth_failed'), 2000);
      }
    };

    processCallback();
  }, [searchParams, handleOAuthCallback, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        {error ? (
          <div className="text-center">
            <div className="mb-4">
              <svg
                className="w-16 h-16 text-red-500 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error de autenticación</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <p className="text-sm text-gray-500">Redirigiendo a la página de inicio de sesión...</p>
          </div>
        ) : (
          <div className="text-center">
            <Spinner className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Completando inicio de sesión</h2>
            <p className="text-gray-600">Por favor espera un momento...</p>
          </div>
        )}
      </div>
    </div>
  );
}
