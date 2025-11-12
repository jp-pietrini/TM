import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { TutorialTooltip, type TutorialStep } from './TutorialTooltip';
import { useAuth } from '../../contexts/AuthContext';

interface OnboardingTutorialProps {
  isOpen: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

// Mobile tutorial steps (simplified - all tabs in one step)
const getMobileSteps = (): TutorialStep[] => [
  {
    target: 'center',
    title: '¡Bienvenido a TrustMe! 👋',
    content: 'Soy Trosmi, tu guía personal. Déjame mostrarte las funciones principales de tu dashboard.',
    placement: 'center',
  },
  {
    target: '[data-tutorial="bottom-nav"]',
    title: 'Tu Menú de Navegación',
    content: `Aquí encuentras todas las secciones:

• 🔍 Descubre: Servicios populares y tendencias
• 📋 Proyectos: Gestiona wishlist y trabajos
• 💬 Mensajes: Conversaciones con profesionales
• 📅 Reservas: Calendario de citas
• 👤 Mi Perfil: Información y configuración`,
    placement: 'top',
  },
  {
    target: '[data-tutorial="mobile-header"]',
    title: 'Acceso Rápido',
    content: 'Usa el botón de búsqueda 🔍, revisa notificaciones 🔔 y accede a tu perfil desde el menú superior.',
    placement: 'bottom',
  },
  {
    target: '[data-tutorial="profile-level"]',
    title: 'Tu Nivel y Progreso 🏆',
    content: '¡Sube de nivel ganando XP! Completa proyectos y escribe reseñas para subir de nivel y recibir más beneficios y ofertas.',
    placement: 'top',
  },
];

// Desktop tutorial steps (simplified)
const getDesktopSteps = (): TutorialStep[] => [
  {
    target: 'center',
    title: '¡Bienvenido a TrustMe! 👋',
    content: 'Soy Trosmi, tu guía personal. Déjame mostrarte las funciones principales de tu dashboard.',
    placement: 'center',
  },
  {
    target: '[data-tutorial="desktop-sidebar"]',
    title: 'Tu Menú de Navegación',
    content: `Aquí encuentras todas las secciones:

• 🔍 Descubre: Servicios populares y tendencias
• 📋 Proyectos: Gestiona wishlist y trabajos
• 💬 Mensajes: Conversaciones con profesionales
• 📅 Reservas: Calendario de citas
• 👤 Mi Perfil: Información y configuración`,
    placement: 'right',
  },
  {
    target: '[data-tutorial="desktop-header"]',
    title: 'Acceso Rápido',
    content: 'Usa el botón de búsqueda 🔍, revisa notificaciones 🔔 y accede a tu perfil desde el menú superior.',
    placement: 'bottom',
  },
  {
    target: '[data-tutorial="profile-level"]',
    title: 'Tu Nivel y Progreso 🏆',
    content: '¡Sube de nivel ganando XP! Completa proyectos y escribe reseñas para subir de nivel. Los profesionales verán tu nivel y te darán mejores ofertas.',
    placement: 'bottom',
  },
];

export function OnboardingTutorial({ isOpen, onComplete, onSkip }: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Reset tutorial to first step when reopened and check if elements exist
  useEffect(() => {
    if (isOpen) {
      // Check if we need to resume from a saved step
      const resumeStep = sessionStorage.getItem('tutorial_resume_step');
      if (resumeStep) {
        const stepNum = parseInt(resumeStep, 10);
        sessionStorage.removeItem('tutorial_resume_step');
        setCurrentStep(stepNum);
        return;
      }

      setCurrentStep(0);

      // Check if current step's target exists after a brief delay
      setTimeout(() => {
        const currentSteps = isMobile ? getMobileSteps() : getDesktopSteps();

        const checkAndSkipInvalidSteps = (stepIndex: number) => {
          if (stepIndex >= currentSteps.length) {
            // No valid steps found, close tutorial
            onComplete();
            return;
          }

          const stepData = currentSteps[stepIndex];
          if (stepData.target === 'center') {
            // Center steps are always valid
            return;
          }

          const element = document.querySelector(stepData.target);
          if (!element) {
            // Skip to next step
            setCurrentStep(stepIndex + 1);
            checkAndSkipInvalidSteps(stepIndex + 1);
          }
        };

        checkAndSkipInvalidSteps(0);
      }, 100);
    }
  }, [isOpen, isMobile, onComplete]);

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get appropriate steps based on screen size
  const steps = isMobile ? getMobileSteps() : getDesktopSteps();
  const currentStepData = steps[currentStep];

  // Scroll target element into view when step changes (only if significantly out of view)
  useEffect(() => {
    if (!isOpen || !currentStepData || currentStepData.target === 'center') return;

    const element = document.querySelector(currentStepData.target);
    if (element) {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const buffer = 100; // Only scroll if element is more than 100px out of view

      const isSignificantlyOutOfView =
        rect.bottom < buffer ||
        rect.top > viewportHeight - buffer;

      if (isSignificantlyOutOfView) {
        // Use instant scroll to avoid animation issues
        element.scrollIntoView({ behavior: 'auto', block: 'center' });
      }
    }
  }, [isOpen, currentStep, currentStepData]);

  // Force recalculation counter for elements that load after navigation
  const [recalcCounter, setRecalcCounter] = useState(0);

  // Trigger recalculation after a delay when step changes
  useEffect(() => {
    if (!isOpen) return;

    // Reset counter on step change
    setRecalcCounter(0);

    // Trigger recalculation after brief delay to catch elements that load after navigation
    const timer = setTimeout(() => {
      setRecalcCounter(1);
    }, 100);

    return () => clearTimeout(timer);
  }, [isOpen, currentStep, currentStepData]);

  // Calculate target element position
  const targetPosition = useMemo(() => {
    const getTargetPosition = () => {
      if (!currentStepData || currentStepData.target === 'center') {
        return {
          top: window.innerHeight / 2,
          left: window.innerWidth / 2,
          width: 0,
          height: 0,
        };
      }

      const element = document.querySelector(currentStepData.target);
      if (!element) {
        return { top: 0, left: 0, width: 0, height: 0 };
      }

      const rect = element.getBoundingClientRect();
      return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
      };
    };

    return getTargetPosition();
  }, [currentStep, currentStepData, recalcCounter]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      const nextStepData = steps[nextStep];

      // Check if next step requires profile page
      if (nextStepData && nextStepData.target === '[data-tutorial="profile-level"]') {
        // Check if we're on the exact profile page (not sub-pages like /perfil/editar)
        if (window.location.pathname !== '/perfil') {
          // Save the current step and indicate tutorial should stay open
          sessionStorage.setItem('tutorial_resume_step', nextStep.toString());
          sessionStorage.setItem('tutorial_should_reopen', 'true');
          // Navigate to profile page
          navigate('/perfil');
          return;
        }
      }

      setCurrentStep(nextStep);

      // Check if next step's target element exists (with a small delay for DOM updates)
      setTimeout(() => {
        if (nextStepData && nextStepData.target !== 'center') {
          const element = document.querySelector(nextStepData.target);
          if (!element) {
            // Element doesn't exist, skip to next step or complete
            if (nextStep < steps.length - 1) {
              handleNext();
            } else {
              onComplete();
            }
          }
        }
      }, 100);
    } else {
      // Tutorial complete
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen || !currentStepData) return null;

  const isCenterPlacement = currentStepData.placement === 'center' || currentStepData.target === 'center';

  // If step targets an element but element doesn't exist, auto-skip
  if (!isCenterPlacement && targetPosition.width === 0 && targetPosition.height === 0) {
    // Double-check that element truly doesn't exist before skipping
    const element = document.querySelector(currentStepData.target);
    if (!element) {
      // Element not found, skip to next step
      setTimeout(() => {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          onComplete();
        }
      }, 0);
      return null;
    }
    // Element exists but position is temporarily unavailable, render anyway
    console.log('Warning: Element found but position is 0x0:', currentStepData.target);
  }

  return (
    <AnimatePresence>
      <div className={`fixed inset-0 z-[9999] ${isCenterPlacement ? 'flex items-center justify-center' : ''}`}>
        {/* Backdrop with rectangular spotlight effect */}
        {currentStepData.target !== 'center' && targetPosition.width > 0 ? (
          <>
            {/* Top overlay - only render if there's space above target */}
            {targetPosition.top > 8 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 right-0 bg-black/60 backdrop-blur-sm pointer-events-none z-[1]"
                style={{
                  top: 0,
                  height: Math.max(0, targetPosition.top - 8),
                }}
              />
            )}
            {/* Bottom overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 bg-black/60 backdrop-blur-sm pointer-events-none z-[1]"
              style={{
                top: targetPosition.top + targetPosition.height + 8,
                bottom: 0,
              }}
            />
            {/* Left overlay - only render if there's space to the left */}
            {targetPosition.left > 8 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute bg-black/60 backdrop-blur-sm pointer-events-none z-[1]"
                style={{
                  top: Math.max(0, targetPosition.top - 8),
                  bottom: Math.max(0, window.innerHeight - targetPosition.top - targetPosition.height - 8),
                  left: 0,
                  width: Math.max(0, targetPosition.left - 8),
                }}
              />
            )}
            {/* Right overlay - only render if there's space to the right */}
            {targetPosition.left + targetPosition.width + 8 < window.innerWidth && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute bg-black/60 backdrop-blur-sm pointer-events-none z-[1]"
                style={{
                  top: Math.max(0, targetPosition.top - 8),
                  bottom: Math.max(0, window.innerHeight - targetPosition.top - targetPosition.height - 8),
                  left: targetPosition.left + targetPosition.width + 8,
                  right: 0,
                }}
              />
            )}
            {/* Highlighted element outline */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute pointer-events-none z-[2]"
              style={{
                top: targetPosition.top - 8,
                left: targetPosition.left - 8,
                width: targetPosition.width + 16,
                height: targetPosition.height + 16,
                border: '3px solid #00BFFF',
                borderRadius: '12px',
                boxShadow: '0 0 0 4px rgba(0, 191, 255, 0.3)',
              }}
            />
          </>
        ) : (
          // Full backdrop for center placement
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-none z-[1]"
          />
        )}

        {/* Tutorial Tooltip */}
        <TutorialTooltip
          step={currentStepData}
          currentStep={currentStep + 1}
          totalSteps={steps.length}
          targetPosition={targetPosition}
          onNext={handleNext}
          onPrevious={currentStep > 0 ? handlePrevious : undefined}
          onSkip={onSkip}
        />
      </div>
    </AnimatePresence>
  );
}
