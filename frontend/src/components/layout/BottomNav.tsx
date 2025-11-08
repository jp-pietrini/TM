import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
}

export interface BottomNavProps {
  items: NavItem[];
}

export const BottomNav: React.FC<BottomNavProps> = ({ items }) => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset-bottom z-50 md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = isActive && item.activeIcon ? item.activeIcon : item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center justify-center flex-1 h-full gap-0.5
                transition-colors duration-200 min-w-[44px]
                ${isActive ? 'text-sky-600' : 'text-gray-600 active:text-gray-900'}
              `}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                {IconComponent}
              </div>
              <span className={`text-xs ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
