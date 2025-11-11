import { ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  disabled?: boolean;
}

export function Tooltip({ content, children, side = 'right', disabled = false }: TooltipProps) {
  if (disabled) {
    return <>{children}</>;
  }

  const sideClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
  };

  return (
    <div className="relative group/tooltip w-full">
      {children}
      <div
        className={`absolute ${sideClasses[side]} pointer-events-none opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-100`}
        style={{ zIndex: 9999 }}
      >
        <div className="bg-gray-900 text-white text-sm font-medium px-3 py-2 rounded-md whitespace-nowrap shadow-xl border border-gray-700">
          {content}
        </div>
      </div>
    </div>
  );
}
