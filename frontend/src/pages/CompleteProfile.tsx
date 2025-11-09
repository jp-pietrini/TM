import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Button, Card, Input } from '../components/ui';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Common country codes for Mexico
const COUNTRY_CODES = [
  { code: '+52', country: 'México', flag: '🇲🇽' },
  { code: '+1', country: 'USA/Canada', flag: '🇺🇸' },
  { code: '+34', country: 'España', flag: '🇪🇸' },
  { code: '+54', country: 'Argentina', flag: '🇦🇷' },
];

export function CompleteProfile() {
  const navigate = useNavigate();
  const { user, token, refreshUser } = useAuth();
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [countryCode, setCountryCode] = useState('+52');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !token) {
      navigate('/login');
      return;
    }

    try {
      setSubmitting(true);

      // Combine country code with phone number
      const fullPhone = `${countryCode}${formData.phoneNumber.replace(/\s/g, '')}`;

      // Update profile
      await axios.post(
        `${API_URL}/api/auth/complete-profile`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: fullPhone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show success toast
      showToast('¡Perfil completado! Bienvenido a TrustMe', 'success');

      // Refresh user data
      await refreshUser();

      // Navigate to home
      navigate('/', { replace: true });
    } catch (err: any) {
      console.error('Complete profile error:', err);

      // Extract error message
      let errorMessage = 'No se pudo completar el perfil. Por favor intenta de nuevo.';

      if (err.response?.data?.details) {
        // Zod validation errors
        const details = err.response.data.details;
        errorMessage = details.map((d: any) => d.message).join(', ');
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }

      showToast(errorMessage, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Completa tu Perfil
          </h1>
          <p className="text-gray-600">
            Solo necesitamos algunos datos más para empezar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Nombre"
            name="firstName"
            type="text"
            required
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Tu nombre"
          />

          <Input
            label="Apellido"
            name="lastName"
            type="text"
            required
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Tu apellido"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              WhatsApp
            </label>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={handleCountryCodeChange}
                className="px-3 py-3 border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-500 min-h-[44px]"
              >
                {COUNTRY_CODES.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.flag} {item.code}
                  </option>
                ))}
              </select>
              <Input
                name="phoneNumber"
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="55 1234 5678"
                className="flex-1"
              />
            </div>
            <p className="mt-1.5 text-sm text-gray-500">
              Usaremos WhatsApp para comunicarnos contigo
            </p>
          </div>

          <Button
            type="submit"
            fullWidth
            loading={submitting}
            disabled={submitting}
          >
            Completar Perfil
          </Button>
        </form>
      </Card>
    </div>
  );
}
