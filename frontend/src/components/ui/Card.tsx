import React from 'react';
import { haptics } from '../../utils/haptics';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  haptic?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
  padding = 'md',
  haptic = true,
}) => {
  const handleClick = () => {
    if (haptic && onClick) {
      haptics.tap();
    }
    onClick?.();
  };

  const baseStyles = 'bg-white rounded-xl shadow-sm border border-gray-100';
  const hoverStyles = hoverable || onClick ? 'hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.98]' : '';

  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${paddingStyles[padding]} ${className}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
