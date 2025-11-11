import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { Button } from './ui';
import { useAuth } from '../contexts/AuthContext';
import { useHaptics } from '../hooks/useHaptics';

interface PublicHeaderProps {
  showAuthButtons?: boolean;
}

// Mock notifications - replace with real data later
const notifications = [
  { id: '1', title: 'Nuevo presupuesto', message: 'Juan te envió un presupuesto', time: 'Hace 5 min', read: false },
  { id: '2', title: 'Nuevo mensaje', message: 'María: "¿Cuándo puedo ir?"', time: 'Hace 1 hora', read: false },
  { id: '3', title: 'Proyecto completado', message: 'José marcó tu proyecto como completado', time: 'Hace 2 horas', read: true },
];

export const PublicHeader: React.FC<PublicHeaderProps> = ({ showAuthButtons = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { triggerHaptic } = useHaptics();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const isProfessionalsPage = location.pathname === '/para-profesionales';

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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
              {/* Show authenticated UI if logged in */}
              {isAuthenticated && user ? (
                <>
                  {/* Search Button */}
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      triggerHaptic('selection');
                      navigate('/descubre');
                    }}
                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                  >
                    <Search className="w-4 h-4" />
                    <span className="text-sm font-medium">Buscar servicio</span>
                  </motion.button>

                  {/* Notifications */}
                  <div className="relative" ref={notificationsRef}>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        triggerHaptic('light');
                        setShowNotifications(!showNotifications);
                      }}
                      className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Bell className="w-5 h-5" />
                      {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </motion.button>

                    {/* Notifications Dropdown */}
                    {showNotifications && (
                      <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 max-h-96 overflow-y-auto">
                        <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-gray-900">Notificaciones</h3>
                          <button
                            onClick={() => setShowNotifications(false)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            ✕
                          </button>
                        </div>

                        <div className="py-1">
                          {notifications.map((notification) => (
                            <button
                              key={notification.id}
                              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-l-4 ${
                                notification.read ? 'border-transparent' : 'border-sky-500 bg-sky-50/30'
                              }`}
                              onClick={() => {
                                setShowNotifications(false);
                                // Navigate based on notification type
                              }}
                            >
                              <div className="flex items-start gap-3">
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                </div>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-sky-500 rounded-full mt-1.5" />
                                )}
                              </div>
                            </button>
                          ))}
                        </div>

                        <div className="px-4 py-2 border-t border-gray-200">
                          <button className="text-sm text-sky-600 hover:text-sky-700 font-medium">
                            Ver todas las notificaciones →
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* User Menu */}
                  <div className="relative" ref={userMenuRef}>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        triggerHaptic('light');
                        setShowUserMenu(!showUserMenu);
                      }}
                      className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-sky-600" />
                      </div>
                      <span className="hidden sm:inline text-sm font-medium">
                        {user.email?.split('@')[0] || 'Usuario'}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </motion.button>

                    {/* User Menu Dropdown */}
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                        <div className="px-4 py-3 border-b border-gray-200">
                          <p className="text-sm font-medium text-gray-900">{user.email?.split('@')[0]}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>

                        <div className="py-2">
                          <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              triggerHaptic('selection');
                              navigate('/perfil');
                              setShowUserMenu(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <User className="w-4 h-4" />
                            Mi Perfil
                          </motion.button>
                          <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              triggerHaptic('selection');
                              navigate('/perfil/ajustes');
                              setShowUserMenu(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Settings className="w-4 h-4" />
                            Ajustes
                          </motion.button>
                        </div>

                        <div className="py-2 border-t border-gray-200">
                          <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              triggerHaptic('medium');
                              handleLogout();
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <LogOut className="w-4 h-4" />
                            Cerrar sesión
                          </motion.button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Show unauthenticated UI */}
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
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
