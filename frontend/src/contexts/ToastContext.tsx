import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast, type ToastType } from '../components/ui/Toast';

interface ToastData {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (type: ToastType, message: string, description?: string, duration?: number) => void;
  success: (message: string, description?: string, duration?: number) => void;
  error: (message: string, description?: string, duration?: number) => void;
  warning: (message: string, description?: string, duration?: number) => void;
  info: (message: string, description?: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (type: ToastType, message: string, description?: string, duration?: number) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      const newToast: ToastData = {
        id,
        type,
        message,
        description,
        duration,
      };

      setToasts((prev) => [...prev, newToast]);
    },
    []
  );

  const success = useCallback(
    (message: string, description?: string, duration?: number) => {
      showToast('success', message, description, duration);
    },
    [showToast]
  );

  const error = useCallback(
    (message: string, description?: string, duration?: number) => {
      showToast('error', message, description, duration);
    },
    [showToast]
  );

  const warning = useCallback(
    (message: string, description?: string, duration?: number) => {
      showToast('warning', message, description, duration);
    },
    [showToast]
  );

  const info = useCallback(
    (message: string, description?: string, duration?: number) => {
      showToast('info', message, description, duration);
    },
    [showToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, success, error, warning, info }}>
      {children}

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        <div className="pointer-events-auto space-y-2">
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} onClose={removeToast} />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};
