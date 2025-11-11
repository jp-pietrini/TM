import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface User {
  id: string;
  email: string;
  phone?: string | null;
  role: 'client' | 'worker' | 'admin' | 'support' | 'company';
  emailVerified: boolean;
  phoneVerified: boolean;
  profileCompleted: boolean;
  isApproved: boolean;
  isActive: boolean;
  isSuspended: boolean;
  termsAccepted: boolean;
  termsAcceptedAt?: string;
  googleId?: string;
  createdAt: string;
  lastLoginAt?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: 'client' | 'worker', termsAccepted: boolean) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  loginWithGoogle: () => void;
  handleOAuthCallback: (token: string, termsAccepted: boolean, profileCompleted: boolean) => Promise<void>;
  verifyEmail: (token: string) => Promise<{ success: boolean; message: string }>;
  resendVerificationEmail: () => Promise<{ success: boolean; message: string }>;
  sendSMSCode: (channel?: 'sms' | 'whatsapp') => Promise<{ success: boolean; message: string }>;
  verifySMSCode: (code: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      setToken(storedToken);
      // Fetch user data with stored token
      fetchUser(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  // Fetch current user data
  const fetchUser = async (authToken: string) => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.data.success) {
        setUser(response.data.data.user);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      // Clear invalid token
      localStorage.removeItem('auth_token');
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      if (response.data.success) {
        const { user: userData, token: authToken } = response.data.data;
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('auth_token', authToken);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error || 'Login failed');
      }
      throw new Error('Login failed');
    }
  };

  // Register function
  const register = async (email: string, password: string, role: 'client' | 'worker', termsAccepted: boolean) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        email,
        password,
        role,
        termsAccepted,
      });

      if (response.data.success) {
        const { user: userData, token: authToken } = response.data.data;
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('auth_token', authToken);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error || 'Registration failed');
      }
      throw new Error('Registration failed');
    }
  };

  // Logout function
  const logout = async () => {
    try {
      if (token) {
        await axios.post(
          `${API_URL}/api/auth/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear state regardless of API call result
      setUser(null);
      setToken(null);
      localStorage.removeItem('auth_token');
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    if (token) {
      await fetchUser(token);
    }
  };

  // Google OAuth login
  const loginWithGoogle = () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = `${API_URL}/api/auth/google`;
  };

  // Handle OAuth callback
  const handleOAuthCallback = async (authToken: string, _termsAccepted: boolean, _profileCompleted: boolean) => {
    try {
      // Store token
      setToken(authToken);
      localStorage.setItem('auth_token', authToken);

      // Fetch user data
      await fetchUser(authToken);

      // Note: termsAccepted and profileCompleted are handled by the caller (OAuthCallback component)
    } catch (error) {
      console.error('OAuth callback error:', error);
      throw new Error('Failed to complete OAuth login');
    }
  };

  // Verify email with token
  const verifyEmail = async (verificationToken: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/verify-email`, {
        params: { token: verificationToken },
      });

      if (response.data.success) {
        // Refresh user data to update emailVerified status
        await refreshUser();
        return { success: true, message: response.data.message };
      }

      return { success: false, message: response.data.error || 'Verification failed' };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return { success: false, message: error.response.data.error || 'Verification failed' };
      }
      return { success: false, message: 'Verification failed' };
    }
  };

  // Resend verification email
  const resendVerificationEmail = async (): Promise<{ success: boolean; message: string }> => {
    try {
      if (!token) {
        return { success: false, message: 'You must be logged in to resend verification email' };
      }

      const response = await axios.post(
        `${API_URL}/api/auth/resend-verification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        return { success: true, message: response.data.message };
      }

      return { success: false, message: response.data.error || 'Failed to resend verification email' };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return { success: false, message: error.response.data.error || 'Failed to resend verification email' };
      }
      return { success: false, message: 'Failed to resend verification email' };
    }
  };

  // Send SMS or WhatsApp verification code
  const sendSMSCode = async (channel: 'sms' | 'whatsapp' = 'whatsapp'): Promise<{ success: boolean; message: string }> => {
    try {
      if (!token) {
        return { success: false, message: 'Debes iniciar sesión para enviar código' };
      }

      const response = await axios.post(
        `${API_URL}/api/auth/send-sms-verification`,
        { channel },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        return { success: true, message: response.data.message };
      }

      return { success: false, message: response.data.error || 'Error al enviar código de verificación' };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return { success: false, message: error.response.data.error || 'Error al enviar código de verificación' };
      }
      return { success: false, message: 'Error al enviar código de verificación' };
    }
  };

  // Verify SMS code
  const verifySMSCode = async (code: string): Promise<{ success: boolean; message: string }> => {
    try {
      if (!token) {
        return { success: false, message: 'Debes iniciar sesión para verificar el código' };
      }

      const response = await axios.post(
        `${API_URL}/api/auth/verify-sms`,
        { code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Refresh user data to update phoneVerified status
        await refreshUser();
        return { success: true, message: response.data.message };
      }

      return { success: false, message: response.data.error || 'Código de verificación incorrecto' };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return { success: false, message: error.response.data.error || 'Error al verificar el código' };
      }
      return { success: false, message: 'Error al verificar el código' };
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
    loginWithGoogle,
    handleOAuthCallback,
    verifyEmail,
    resendVerificationEmail,
    sendSMSCode,
    verifySMSCode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Axios interceptor to add auth token to requests
export function setupAxiosInterceptor(getToken: () => string | null) {
  axios.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}
