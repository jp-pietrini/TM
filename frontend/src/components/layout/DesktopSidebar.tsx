import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  FolderOpen,
  MessageCircle,
  Calendar,
  User,
  ChevronDown,
  ChevronRight,
  LogOut,
  ChevronLeft,
  Flame,
  TrendingUp,
  List,
  PlayCircle,
  CheckCircle,
  Eye,
  Edit,
  Settings,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useHaptics } from '../../hooks/useHaptics';

interface SidebarProps {
  className?: string;
}

interface SubItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SectionItem {
  path?: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: SubItem[];
}

const sidebarSections: SectionItem[] = [
  {
    label: 'Descubre',
    icon: Search,
    subItems: [
      { path: '/descubre/popular', label: 'Popular', icon: Flame },
      { path: '/descubre/tendencias', label: 'Tendencias', icon: TrendingUp },
    ],
  },
  {
    label: 'Proyectos',
    icon: FolderOpen,
    subItems: [
      { path: '/proyectos/wishlist', label: 'Wishlist', icon: List },
      { path: '/proyectos/en-curso', label: 'En curso', icon: PlayCircle },
      { path: '/proyectos/abiertos', label: 'Abiertos', icon: FolderOpen },
      { path: '/proyectos/completados', label: 'Completados', icon: CheckCircle },
    ],
  },
  {
    path: '/mensajes',
    label: 'Mensajes',
    icon: MessageCircle,
  },
  {
    path: '/reservas',
    label: 'Reservas',
    icon: Calendar,
  },
  {
    label: 'Mi Perfil',
    icon: User,
    subItems: [
      { path: '/perfil', label: 'Ver perfil', icon: Eye },
      { path: '/perfil/editar', label: 'Editar', icon: Edit },
      { path: '/perfil/ajustes', label: 'Ajustes', icon: Settings },
    ],
  },
];

export function DesktopSidebar({ className = '' }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    Descubre: false,
    Proyectos: false,
    'Mi Perfil': false,
  });
  const [hoveredItem, setHoveredItem] = useState<{ label: string; top: number; height: number } | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { triggerHaptic } = useHaptics();

  const toggleSection = (label: string) => {
    if (!isExpanded) {
      // If sidebar is collapsed, expand it and open the section
      setIsExpanded(true);
      setExpandedSections((prev) => ({
        ...prev,
        [label]: true,
      }));
    } else {
      // If sidebar is expanded, just toggle the section
      setExpandedSections((prev) => ({
        ...prev,
        [label]: !prev[label],
      }));
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside
      className={`hidden lg:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${
        isExpanded ? 'w-70' : 'w-16'
      } ${className}`}
      style={{ overflow: 'visible' }}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200">
        {isExpanded ? (
          <>
            <span className="font-semibold text-gray-900">Menú</span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                triggerHaptic('light');
                setIsExpanded(false);
              }}
              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Colapsar menú"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
          </>
        ) : (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              triggerHaptic('light');
              setIsExpanded(true);
            }}
            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors mx-auto"
            title="Expandir menú"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto p-2">
        {sidebarSections.map((section) => (
          <div key={section.label} className="mb-1">
            {section.path && !section.subItems ? (
              // Simple link (Mensajes, Reservas)
              <motion.div whileTap={{ scale: 0.97 }}>
                <NavLink
                  to={section.path}
                  onClick={() => triggerHaptic('selection')}
                  onMouseEnter={(e) => {
                    if (!isExpanded) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHoveredItem({ label: section.label, top: rect.top, height: rect.height });
                    }
                  }}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-sky-50 text-sky-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  <section.icon className="w-5 h-5 flex-shrink-0" />
                  {isExpanded && <span className="text-sm font-medium">{section.label}</span>}
                </NavLink>
              </motion.div>
            ) : (
              // Collapsible section (Descubre, Proyectos, Mi Perfil)
              <>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    triggerHaptic('selection');
                    toggleSection(section.label);
                  }}
                  onMouseEnter={(e) => {
                    if (!isExpanded) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHoveredItem({ label: section.label, top: rect.top, height: rect.height });
                    }
                  }}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <section.icon className="w-5 h-5 flex-shrink-0" />
                  {isExpanded && (
                    <>
                      <span className="text-sm font-medium flex-1 text-left">
                        {section.label}
                      </span>
                      {expandedSections[section.label] ? (
                        <ChevronDown className="w-4 h-4 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 flex-shrink-0" />
                      )}
                    </>
                  )}
                </motion.button>

                {/* Sub-items */}
                {isExpanded && expandedSections[section.label] && section.subItems && (
                  <div className="ml-4 mt-1 space-y-1">
                    {section.subItems.map((subItem) => (
                      <motion.div key={subItem.path} whileTap={{ scale: 0.97 }}>
                        <NavLink
                          to={subItem.path}
                          onClick={() => triggerHaptic('selection')}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                              isActive
                                ? 'bg-sky-50 text-sky-600'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`
                          }
                        >
                          <subItem.icon className="w-4 h-4 flex-shrink-0" />
                          <span>{subItem.label}</span>
                        </NavLink>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </nav>

      {/* Logout Button - Fixed at Bottom */}
      <div className="p-2 border-t border-gray-200">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            triggerHaptic('medium');
            handleLogout();
          }}
          onMouseEnter={(e) => {
            if (!isExpanded) {
              const rect = e.currentTarget.getBoundingClientRect();
              setHoveredItem({ label: 'Cerrar sesión', top: rect.top, height: rect.height });
            }
          }}
          onMouseLeave={() => setHoveredItem(null)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {isExpanded && <span className="text-sm font-medium">Cerrar sesión</span>}
        </motion.button>
      </div>

      {/* Global Tooltip - Rendered outside nav to avoid overflow clipping */}
      {hoveredItem && !isExpanded && (
        <div
          className="fixed bg-gray-900 text-white text-sm font-medium px-3 py-2 rounded-md whitespace-nowrap shadow-xl border border-gray-700 pointer-events-none"
          style={{
            zIndex: 9999,
            left: '72px', // 64px sidebar width + 8px margin
            top: `${hoveredItem.top + hoveredItem.height / 2}px`,
            transform: 'translateY(-50%)',
          }}
        >
          {hoveredItem.label}
        </div>
      )}
    </aside>
  );
}
