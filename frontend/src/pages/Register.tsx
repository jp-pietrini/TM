import { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button, Input, Card } from '../components/ui';
import { PublicHeader } from '../components/PublicHeader';

export function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { register, loginWithGoogle, loginWithFacebook, isLoading, isAuthenticated, user, logout } = useAuth();

  // Get role from URL query parameter
  const roleParam = searchParams.get('role');
  const initialRole = (roleParam === 'worker' || roleParam === 'client') ? roleParam : 'client';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: initialRole as 'client' | 'worker',
    phone: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    termsAccepted?: string;
    general?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    // Terms validation
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      await register(formData.email, formData.password, formData.role, formData.termsAccepted);

      // Show success message and redirect to email verification notice
      navigate('/email-verification-sent', {
        state: { email: formData.email },
        replace: true
      });
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : 'Error al registrarse',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleRegister = () => {
    loginWithGoogle();
  };

  const handleFacebookRegister = () => {
    loginWithFacebook();
  };

  const handleLogout = async () => {
    await logout();
  };

  // Show "already logged in" message if authenticated
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PublicHeader />
        <div className="flex items-center justify-center px-4 py-8">
          <Card className="w-full max-w-md p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Ya has iniciado sesión</h1>
            <p className="text-gray-600 mb-4">
              Estás conectado como <strong>{user.email}</strong>
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => navigate('/')}
              fullWidth
              variant="primary"
            >
              Ir al inicio
            </Button>
            <Button
              onClick={handleLogout}
              fullWidth
              variant="outline"
            >
              Cerrar sesión e ingresar con otra cuenta
            </Button>
          </div>
        </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />
      <div className="flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear cuenta en TrustMe</h1>
          <p className="text-gray-600">Únete a nuestra comunidad</p>
        </div>

        {/* General Error Alert */}
        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{errors.general}</p>
          </div>
        )}

        {/* Google OAuth Button */}
        <Button
          onClick={handleGoogleRegister}
          variant="outline"
          fullWidth
          className="mb-3 flex items-center justify-center gap-3 py-3"
          disabled={isLoading || isSubmitting}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Registrarse con Google
        </Button>

        {/* Facebook OAuth Button */}
        <Button
          onClick={handleFacebookRegister}
          variant="outline"
          fullWidth
          className="mb-6 flex items-center justify-center gap-3 py-3"
          disabled={isLoading || isSubmitting}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Registrarse con Facebook
        </Button>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">O regístrate con tu correo</span>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Cómo quieres usar TrustMe?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'client' })}
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData.role === 'client'
                    ? 'border-sky-500 bg-sky-50 text-sky-900'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="text-2xl mb-1">👤</div>
                <div className="font-medium">Cliente</div>
                <div className="text-xs text-gray-600 mt-1">Busco servicios</div>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'worker' })}
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData.role === 'worker'
                    ? 'border-sky-500 bg-sky-50 text-sky-900'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="text-2xl mb-1">🔧</div>
                <div className="font-medium">Trabajador</div>
                <div className="text-xs text-gray-600 mt-1">Ofrezco servicios</div>
              </button>
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="tu@email.com"
              error={errors.email}
              disabled={isSubmitting}
              autoComplete="email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Mínimo 8 caracteres"
              error={errors.password}
              disabled={isSubmitting}
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar contraseña
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="Confirma tu contraseña"
              error={errors.confirmPassword}
              disabled={isSubmitting}
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                className="mt-1 w-4 h-4 text-sky-500 rounded border-gray-300 focus:ring-sky-500"
                disabled={isSubmitting}
              />
              <span className="text-sm text-gray-700">
                Acepto los{' '}
                <Link to="/terms" className="text-sky-500 hover:text-sky-600 font-medium">
                  términos y condiciones
                </Link>{' '}
                y la{' '}
                <Link to="/privacy" className="text-sky-500 hover:text-sky-600 font-medium">
                  política de privacidad
                </Link>
              </span>
            </label>
            {errors.termsAccepted && (
              <p className="mt-1 text-sm text-red-600">{errors.termsAccepted}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            disabled={isSubmitting}
            className="py-3"
          >
            {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
          </Button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link
              to="/login"
              className="text-sky-500 hover:text-sky-600 font-medium"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </Card>
      </div>
    </div>
  );
}
