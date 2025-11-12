import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, User, ChevronDown, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useHaptics } from '../../hooks/useHaptics';

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

export function MobileHeader() {
  const [isVisible, setIsVisible] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [notifications] = useState<Notification[]>(mockNotifications);
  const lastScrollY = useRef(0);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { triggerHaptic } = useHaptics();

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Scroll detection for show/hide header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header when scrolling up or at top
      // Hide header when scrolling down (but not at top)
      if (currentScrollY < lastScrollY.current || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsVisible(false);
        // Close any open dropdowns when hiding header
        setShowNotifications(false);
        setShowUserMenu(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns and search when clicking outside
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
      if (
        searchButtonRef.current &&
        !searchButtonRef.current.contains(event.target as Node)
      ) {
        setIsSearchExpanded(false);
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
    <>
      {/* Backdrop Overlay */}
      <AnimatePresence>
        {(showNotifications || showUserMenu) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              setShowNotifications(false);
              setShowUserMenu(false);
            }}
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      <header
        data-tutorial="mobile-header"
        className={`lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 h-14">
          {/* Logo */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              triggerHaptic('light');
              navigate('/perfil');
            }}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <img src="/brand/Logo-blue.png" alt="TrustMe" className="h-8" />
          </motion.button>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search Button - Expandable */}
            <div ref={searchButtonRef}>
              <motion.button
                layout
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  triggerHaptic('light');
                  if (isSearchExpanded) {
                    // If already expanded, navigate
                    navigate('/descubre');
                  } else {
                    // First click: expand the button
                    setIsSearchExpanded(true);
                  }
                }}
                className="flex items-center gap-1.5 bg-sky-500 text-white rounded-lg hover:bg-sky-600 active:bg-sky-700 transition-colors shadow-sm overflow-hidden"
                style={{
                  padding: isSearchExpanded ? '6px 12px' : '8px',
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                <Search className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence mode="wait">
                  {isSearchExpanded && (
                    <motion.span
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 'auto', opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="text-sm font-medium whitespace-nowrap"
                    >
                      Buscar
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  triggerHaptic('light');
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                className="relative p-2 text-gray-600 active:text-gray-900 active:bg-gray-100 rounded-lg transition-colors"
              >
                <motion.div
                  animate={unreadCount > 0 ? { rotate: [0, -15, 15, -15, 0] } : {}}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
                >
                  <Bell className="w-5 h-5" />
                </motion.div>
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {unreadCount}
                    </motion.span>
                  </motion.span>
                )}
              </motion.button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="fixed left-4 right-4 top-16 bg-white rounded-lg shadow-lg border border-gray-200 max-w-md mx-auto z-50"
                >
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notificaciones</h3>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
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
                      <motion.button
                        key={notification.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          triggerHaptic('light');
                          // Handle notification click
                          setShowNotifications(false);
                        }}
                        className={`w-full flex items-start gap-3 p-4 border-b border-gray-100 active:bg-gray-50 transition-colors ${
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
                      </motion.button>
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
                      className="w-full text-sm text-sky-500 font-medium"
                    >
                      Ver todas las notificaciones →
                    </button>
                  </div>
                )}
              </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                triggerHaptic('light');
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 p-1 text-gray-700 active:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-sky-600" />
              </div>
              <ChevronDown className="w-4 h-4" />
            </motion.button>

            {/* User Menu Dropdown */}
            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="fixed right-4 top-16 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                >
                <div className="p-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900 truncate">{user?.email}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>

                <div className="py-2">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      triggerHaptic('light');
                      navigate('/perfil');
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 active:bg-gray-50"
                  >
                    <User className="w-4 h-4" />
                    Mi Perfil
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      triggerHaptic('light');
                      navigate('/perfil/ajustes');
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 active:bg-gray-50"
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
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 active:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar sesión
                  </motion.button>
                </div>
              </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        </div>
      </header>
    </>
  );
}
