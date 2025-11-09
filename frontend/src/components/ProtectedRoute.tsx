import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Spinner } from './ui';

interface ProtectedRouteProps {
  children: ReactNode;
  /** Roles allowed to access this route. If not provided, any authenticated user can access */
  allowedRoles?: Array<'client' | 'worker' | 'admin' | 'support' | 'company'>;
  /** Require email verification to access this route */
  requireEmailVerified?: boolean;
  /** Require phone verification to access this route */
  requirePhoneVerified?: boolean;
  /** Require terms acceptance to access this route */
  requireTermsAccepted?: boolean;
  /** Require profile completion to access this route */
  requireProfileCompleted?: boolean;
  /** Require admin approval (for workers) to access this route */
  requireApproved?: boolean;
}

export function ProtectedRoute({
  children,
  allowedRoles,
  requireEmailVerified = false,
  requirePhoneVerified = false,
  requireTermsAccepted = true,
  requireProfileCompleted = false,
  requireApproved = false,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Spinner className="w-12 h-12 mx-auto mb-4" />
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Acceso denegado</h2>
          <p className="text-gray-600 mb-4">
            No tienes permisos para acceder a esta página.
          </p>
          <p className="text-sm text-gray-500">
            Tu rol actual: <span className="font-medium">{user.role}</span>
          </p>
        </div>
      </div>
    );
  }

  // Check email verification requirement
  if (requireEmailVerified && !user.emailVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-yellow-600"
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifica tu correo electrónico</h2>
          <p className="text-gray-600 mb-6">
            Necesitas verificar tu correo electrónico para acceder a esta página.
          </p>
          <Navigate to="/email-verification-sent" replace />
        </div>
      </div>
    );
  }

  // Check phone verification requirement
  if (requirePhoneVerified && !user.phoneVerified) {
    return <Navigate to="/verify-phone" state={{ from: location }} replace />;
  }

  // Check terms acceptance requirement
  if (requireTermsAccepted && !user.termsAccepted) {
    return <Navigate to="/accept-terms" state={{ from: location }} replace />;
  }

  // Check profile completion requirement
  if (requireProfileCompleted && !user.profileCompleted) {
    return <Navigate to="/complete-profile" state={{ from: location }} replace />;
  }

  // Check admin approval requirement (for workers)
  if (requireApproved && !user.isApproved) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cuenta pendiente de aprobación</h2>
          <p className="text-gray-600">
            Tu cuenta está siendo revisada por nuestro equipo. Te notificaremos cuando esté aprobada.
          </p>
        </div>
      </div>
    );
  }

  // Check if account is suspended
  if (user.isSuspended) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cuenta suspendida</h2>
          <p className="text-gray-600">
            Tu cuenta ha sido suspendida. Contacta a soporte para más información.
          </p>
        </div>
      </div>
    );
  }

  // Check if account is active
  if (!user.isActive) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cuenta inactiva</h2>
          <p className="text-gray-600">
            Tu cuenta no está activa. Contacta a soporte para más información.
          </p>
        </div>
      </div>
    );
  }

  // All checks passed, render the protected content
  return <>{children}</>;
}
