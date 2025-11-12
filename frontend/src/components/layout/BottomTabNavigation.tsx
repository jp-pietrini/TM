import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, FolderOpen, MessageCircle, Calendar, User } from 'lucide-react';
import { useHaptics } from '../../hooks/useHaptics';

interface TabItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const tabs: TabItem[] = [
  { path: '/descubre', label: 'Descubre', icon: Search },
  { path: '/proyectos', label: 'Proyectos', icon: FolderOpen },
  { path: '/mensajes', label: 'Mensajes', icon: MessageCircle },
  { path: '/reservas', label: 'Reservas', icon: Calendar },
  { path: '/perfil', label: 'Mi Perfil', icon: User },
];

export function BottomTabNavigation() {
  const { triggerHaptic } = useHaptics();

  const handleTabClick = () => {
    triggerHaptic('selection');
  };

  return (
    <nav data-tutorial="bottom-nav" className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            onClick={handleTabClick}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive
                  ? 'text-sky-500'
                  : 'text-gray-600 active:text-gray-900'
              }`
            }
          >
            {({ isActive }) => (
              <motion.div
                whileTap={{ scale: 0.85 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <tab.icon className="w-6 h-6 mb-1" />
                </motion.div>
                <span className={`text-xs ${isActive ? 'font-medium' : 'font-normal'}`}>
                  {tab.label}
                </span>
              </motion.div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
