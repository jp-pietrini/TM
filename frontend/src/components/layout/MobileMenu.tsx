import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu } from 'lucide-react';
import { haptics } from '../../utils/haptics';

export interface MobileMenuItem {
  path: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface MobileMenuProps {
  items: MobileMenuItem[];
  className?: string;
  logo?: React.ReactNode;
  footer?: React.ReactNode;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  items,
  className = '',
  logo,
  footer,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    haptics.tap();
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${className}`}
        aria-label="Toggle menu"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      {/* Slide-in Menu */}
      <div
        className={`
          fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-50 md:hidden
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          shadow-2xl
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {logo || (
            <img
              src="/brand/Logo-blue.png"
              alt="TrustMe"
              className="h-8 object-contain"
            />
          )}
          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {items.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => haptics.tap()}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg
                      transition-all duration-200 active:scale-95
                      ${
                        isActive
                          ? 'bg-sky-50 text-sky-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    {item.icon && (
                      <div className="w-5 h-5 flex items-center justify-center">
                        {item.icon}
                      </div>
                    )}
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-sky-500 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        {footer && (
          <div className="border-t border-gray-200 p-4">
            {footer}
          </div>
        )}
      </div>
    </>
  );
};
