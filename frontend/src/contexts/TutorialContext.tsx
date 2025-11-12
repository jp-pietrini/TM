import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface TutorialContextType {
  isTutorialOpen: boolean;
  hasCompletedTutorial: boolean;
  startTutorial: () => void;
  skipTutorial: () => void;
  completeTutorial: () => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

export function TutorialProvider({ children }: { children: ReactNode }) {
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [hasCompletedTutorial, setHasCompletedTutorial] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Load tutorial state from localStorage on mount
  useEffect(() => {
    const completed = localStorage.getItem('onboarding_tutorial_completed');
    if (completed === 'true') {
      setHasCompletedTutorial(true);
    }
  }, []);

  // Auto-show tutorial on first dashboard visit or when resuming
  useEffect(() => {
    // Check if tutorial should reopen after navigation
    const shouldReopen = sessionStorage.getItem('tutorial_should_reopen');
    if (shouldReopen === 'true') {
      sessionStorage.removeItem('tutorial_should_reopen');
      const timer = setTimeout(() => {
        setIsTutorialOpen(true);
      }, 800); // Longer delay to ensure page is fully loaded
      return () => clearTimeout(timer);
    }

    if (isAuthenticated && user && !hasCompletedTutorial) {
      // Check if user is on a dashboard page (not onboarding flows)
      const isDashboardPage =
        window.location.pathname.startsWith('/perfil') ||
        window.location.pathname.startsWith('/descubre') ||
        window.location.pathname.startsWith('/proyectos') ||
        window.location.pathname.startsWith('/mensajes') ||
        window.location.pathname.startsWith('/reservas');

      if (isDashboardPage) {
        // Small delay to ensure page is fully loaded
        const timer = setTimeout(() => {
          setIsTutorialOpen(true);
        }, 1000);

        return () => clearTimeout(timer);
      }
    }
  }, [isAuthenticated, user, hasCompletedTutorial]);

  const startTutorial = () => {
    console.log('startTutorial called');
    setIsTutorialOpen(true);
  };

  const skipTutorial = () => {
    setIsTutorialOpen(false);
    setHasCompletedTutorial(true);
    localStorage.setItem('onboarding_tutorial_completed', 'true');

    // TODO: Send to backend API to persist across devices
    // await axios.post('/api/user/tutorial/complete', { skipped: true });
  };

  const completeTutorial = () => {
    setIsTutorialOpen(false);
    setHasCompletedTutorial(true);
    localStorage.setItem('onboarding_tutorial_completed', 'true');

    // TODO: Send to backend API to persist across devices
    // await axios.post('/api/user/tutorial/complete', { skipped: false });
  };

  return (
    <TutorialContext.Provider
      value={{
        isTutorialOpen,
        hasCompletedTutorial,
        startTutorial,
        skipTutorial,
        completeTutorial,
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
}

export function useTutorial() {
  const context = useContext(TutorialContext);
  if (context === undefined) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
}
