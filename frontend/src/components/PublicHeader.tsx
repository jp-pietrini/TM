import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui';

interface PublicHeaderProps {
  showAuthButtons?: boolean;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({ showAuthButtons = true }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const isProfessionalsPage = location.pathname === '/para-profesionales';

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img src="/brand/Logo-blue.png" alt="TrustMe" className="h-10" />
          </button>

          {showAuthButtons && (
            <div className="flex items-center gap-3">
              {!isProfessionalsPage && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/para-profesionales')}
                  className="hidden sm:inline-flex"
                >
                  Para profesionales
                </Button>
              )}

              {isProfessionalsPage && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/')}
                  className="hidden sm:inline-flex"
                >
                  Para clientes
                </Button>
              )}

              {!isLoginPage && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="hidden sm:inline-flex"
                >
                  Iniciar sesión
                </Button>
              )}

              {!isRegisterPage && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/register')}
                >
                  Registrarse
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
