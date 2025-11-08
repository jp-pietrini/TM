import React from 'react';

export interface HeaderProps {
  title?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  left,
  right,
  className = '',
}) => {
  return (
    <header className={`bg-white border-b border-gray-100 sticky top-0 z-50 ${className}`}>
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left section */}
        <div className="flex items-center min-w-0 flex-1">
          {left || (
            <img src="/brand/Logo.svg" alt="TrustMe" className="h-8 object-contain" />
          )}
        </div>

        {/* Center section (title) */}
        {title && (
          <div className="flex-shrink-0 px-4">
            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          </div>
        )}

        {/* Right section */}
        <div className="flex items-center gap-2 justify-end flex-1">
          {right}
        </div>
      </div>
    </header>
  );
};
