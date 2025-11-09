import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Button, Card } from '../components/ui';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function AcceptTerms() {
  const navigate = useNavigate();
  const { user, token, refreshUser } = useAuth();
  const { showToast } = useToast();
  const [accepting, setAccepting] = useState(false);

  const handleAccept = async () => {
    if (!user || !token) {
      navigate('/login');
      return;
    }

    try {
      setAccepting(true);

      await axios.post(
        `${API_URL}/api/auth/accept-terms`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show success
      showToast('success', 'Términos aceptados correctamente');

      // Refresh user data
      await refreshUser();

      // Check if profile is completed, otherwise go to complete profile
      if (!user.profileCompleted) {
        navigate('/complete-profile', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err: any) {
      console.error('Accept terms error:', err);
      const errorMessage = err.response?.data?.error || 'No se pudieron aceptar los términos. Por favor intenta de nuevo.';
      showToast('error', errorMessage);
    } finally {
      setAccepting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="max-w-2xl w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Términos y Condiciones
          </h1>
          <p className="text-gray-600">
            Por favor lee y acepta nuestros términos para continuar
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6 max-h-96 overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Términos de Servicio de TrustMe
          </h2>

          <div className="space-y-4 text-sm text-gray-700">
            <p>
              Bienvenido a TrustMe. Al usar nuestra plataforma, aceptas los siguientes términos:
            </p>

            <h3 className="font-semibold text-gray-900">1. Uso de la Plataforma</h3>
            <p>
              TrustMe es una plataforma que conecta clientes con profesionales de servicios para el hogar.
              Debes usar la plataforma de manera responsable y honesta.
            </p>

            <h3 className="font-semibold text-gray-900">2. Responsabilidades del Usuario</h3>
            <p>
              - Proporcionar información precisa y actualizada<br />
              - Mantener la confidencialidad de tu cuenta<br />
              - No usar la plataforma para actividades ilegales<br />
              - Respetar a otros usuarios de la plataforma
            </p>

            <h3 className="font-semibold text-gray-900">3. Pagos y Reembolsos</h3>
            <p>
              - Los leads cuestan 100 MXN (no exclusivos)<br />
              - Primera semana gratis con 300 MXN de crédito<br />
              - Reembolso automático si el cliente no responde en 48 horas<br />
              - Los pagos de trabajos se retienen por 5 días en garantía
            </p>

            <h3 className="font-semibold text-gray-900">4. Privacidad</h3>
            <p>
              Respetamos tu privacidad y protegemos tus datos personales de acuerdo con nuestra
              Política de Privacidad.
            </p>

            <h3 className="font-semibold text-gray-900">5. Modificaciones</h3>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento.
              Te notificaremos de cambios importantes.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            fullWidth
            onClick={() => navigate('/login')}
            disabled={accepting}
          >
            Cancelar
          </Button>
          <Button
            fullWidth
            onClick={handleAccept}
            loading={accepting}
            disabled={accepting}
          >
            Acepto los Términos
          </Button>
        </div>
      </Card>
    </div>
  );
}
