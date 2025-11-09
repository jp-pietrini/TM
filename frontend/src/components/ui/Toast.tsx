import React, { useEffect } from 'react';
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const icons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const styles = {
  success: {
    container: 'bg-white border-green-200 shadow-lg',
    icon: 'text-green-500',
    title: 'text-green-900',
    description: 'text-green-700',
  },
  error: {
    container: 'bg-white border-red-200 shadow-lg',
    icon: 'text-red-500',
    title: 'text-red-900',
    description: 'text-red-700',
  },
  warning: {
    container: 'bg-white border-yellow-200 shadow-lg',
    icon: 'text-yellow-500',
    title: 'text-yellow-900',
    description: 'text-yellow-700',
  },
  info: {
    container: 'bg-white border-blue-200 shadow-lg',
    icon: 'text-blue-500',
    title: 'text-blue-900',
    description: 'text-blue-700',
  },
};

export const Toast: React.FC<ToastProps> = ({
  id,
  type,
  message,
  description,
  duration = 5000,
  onClose,
}) => {
  const Icon = icons[type] || icons.info;
  const style = styles[type] || styles.info;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-lg border min-w-[320px] max-w-md
        animate-slide-in-right
        ${style.container}
      `}
      role="alert"
    >
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${style.icon}`} />

      <div className="flex-1 min-w-0">
        <p className={`font-medium text-sm ${style.title}`}>{message}</p>
        {description && (
          <p className={`mt-1 text-sm ${style.description}`}>{description}</p>
        )}
      </div>

      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  );
};
