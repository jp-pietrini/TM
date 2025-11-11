import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Notification {
  id: string;
  type: 'quote' | 'message' | 'status' | 'reminder' | 'payment' | 'review';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

// Mock notifications data - will be replaced with real data later
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'quote',
    title: 'Nuevo presupuesto',
    message: 'Juan te envió un presupuesto',
    timestamp: 'Hace 5 minutos',
    read: false,
  },
  {
    id: '2',
    type: 'message',
    title: 'Nuevo mensaje',
    message: 'María respondió a tu consulta',
    timestamp: 'Hace 1 hora',
    read: false,
  },
  {
    id: '3',
    type: 'status',
    title: 'Proyecto actualizado',
    message: 'El trabajo de plomería fue completado',
    timestamp: 'Hace 2 horas',
    read: true,
  },
];

const getNotificationIcon = (type: Notification['type']) => {
  const icons = {
    quote: '📋',
    message: '💬',
    status: '✅',
    reminder: '📅',
    payment: '💰',
    review: '⭐',
  };
  return icons[type];
};

export function DesktopHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications] = useState<Notification[]>(mockNotifications);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
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
    await logout();
    navigate('/login');
  };

  return (
    <header className="hidden lg:flex items-center justify-between px-6 h-16 bg-white border-b border-gray-200">
      {/* Logo */}
      <div className="flex items-center">
        <button
          onClick={() => navigate('/perfil')}
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <img src="/brand/Logo-blue.png" alt="TrustMe" className="h-10" />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search Button */}
        <button
          onClick={() => navigate('/descubre')}
          className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
        >
          <Search className="w-4 h-4" />
          <span className="text-sm font-medium">Buscar servicio</span>
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Notificaciones</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No tienes notificaciones
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <button
                      key={notification.id}
                      onClick={() => {
                        // Handle notification click
                        setShowNotifications(false);
                      }}
                      className={`w-full flex items-start gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <span className="text-2xl flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </span>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {notification.timestamp}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                      )}
                    </button>
                  ))
                )}
              </div>

              {notifications.length > 0 && (
                <div className="p-3 border-t border-gray-200">
                  <button
                    onClick={() => {
                      navigate('/notificaciones');
                      setShowNotifications(false);
                    }}
                    className="w-full text-sm text-sky-500 hover:text-sky-600 font-medium"
                  >
                    Ver todas las notificaciones →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-sky-600" />
            </div>
            <span className="text-sm font-medium">
              {user?.email?.split('@')[0] || 'Usuario'}
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-3 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>

              <div className="py-2">
                <button
                  onClick={() => {
                    navigate('/perfil');
                    setShowUserMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <User className="w-4 h-4" />
                  Mi Perfil
                </button>
                <button
                  onClick={() => {
                    navigate('/perfil/ajustes');
                    setShowUserMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Settings className="w-4 h-4" />
                  Ajustes
                </button>
              </div>

              <div className="py-2 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
