import { useRef, useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui';

// Tutorial step definition
export interface TutorialStep {
  target: string; // CSS selector or special keyword like 'center'
  title: string;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  disableBeacon?: boolean;
  spotlightClicks?: boolean;
}

interface TutorialTooltipProps {
  step: TutorialStep;
  currentStep: number;
  totalSteps: number;
  targetPosition: { top: number; left: number; width: number; height: number };
  onNext: () => void;
  onPrevious?: () => void;
  onSkip: () => void;
}

export function TutorialTooltip({
  step,
  currentStep,
  totalSteps,
  targetPosition,
  onNext,
  onPrevious,
  onSkip,
}: TutorialTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [calculatedPosition, setCalculatedPosition] = useState<any>(null);
  const isPositionedRef = useRef(false);
  const isMobile = window.innerWidth < 1024;
  const isCenterPlacement = step.placement === 'center' || step.target === 'center';

  // Calculate tooltip position based on actual rendered size
  useLayoutEffect(() => {
    if (isCenterPlacement) return;

    const calculatePosition = () => {
      const tooltipWidth = 380;
      const gap = 20;

      // For mobile, respect placement while ensuring visibility
      if (isMobile) {
        const viewportHeight = window.innerHeight;
        const viewportTop = targetPosition.top - window.scrollY;
        // Use actual height if available, otherwise use better estimate (350px instead of 400px)
        const tooltipHeight = tooltipRef.current?.offsetHeight || 350;
        const viewportPadding = 20;
        const originalPlacement = step.placement || 'bottom';

        // For 'top' placement - position ABOVE the target
        if (originalPlacement === 'top') {
          const topPosition = viewportTop - tooltipHeight - gap;

          // Check if it fits above
          if (topPosition >= viewportPadding) {
            return {
              top: topPosition,
              left: '16px',
              right: '16px',
            };
          }

          // Doesn't fit above, position as high as possible
          return {
            top: viewportPadding,
            left: '16px',
            right: '16px',
          };
        }

        // For 'bottom' placement - position BELOW the target
        if (originalPlacement === 'bottom') {
          const bottomPosition = viewportTop + targetPosition.height + gap;

          // Check if it fits below
          if (bottomPosition + tooltipHeight + viewportPadding <= viewportHeight) {
            return {
              top: bottomPosition,
              left: '16px',
              right: '16px',
            };
          }

          // Doesn't fit below, try above
          const topPosition = viewportTop - tooltipHeight - gap;
          if (topPosition >= viewportPadding) {
            return {
              top: topPosition,
              left: '16px',
              right: '16px',
            };
          }

          // Neither works, position at top
          return {
            top: viewportPadding,
            left: '16px',
            right: '16px',
          };
        }

        // For left/right placement on mobile - center vertically
        const centerPosition = Math.max(
          viewportPadding,
          Math.min(
            viewportTop + targetPosition.height / 2 - tooltipHeight / 2,
            viewportHeight - tooltipHeight - viewportPadding
          )
        );

        return {
          top: centerPosition,
          left: '16px',
          right: '16px',
        };
      }

      // Desktop positioning
      const desktopViewportTop = targetPosition.top - window.scrollY;
      const desktopViewportLeft = targetPosition.left - window.scrollX;
      const desktopTooltipHeight = tooltipRef.current?.offsetHeight || 500;

      const positions: Record<string, any> = {
        top: {
          top: desktopViewportTop - desktopTooltipHeight - gap,
          left: desktopViewportLeft + targetPosition.width / 2,
          transform: 'translateX(-50%)',
        },
        bottom: {
          top: desktopViewportTop + targetPosition.height + gap,
          left: desktopViewportLeft + targetPosition.width / 2,
          transform: 'translateX(-50%)',
        },
        left: {
          top: desktopViewportTop + targetPosition.height / 2,
          left: desktopViewportLeft - tooltipWidth - gap,
          transform: 'translateY(-50%)',
        },
        right: {
          top: desktopViewportTop + targetPosition.height / 2,
          left: desktopViewportLeft + targetPosition.width + gap,
          transform: 'translateY(-50%)',
        },
      };

      return positions[step.placement || 'bottom'] || positions.bottom;
    };

    const position = calculatePosition();
    setCalculatedPosition(position);

    // Mark as positioned after calculation
    if (!isPositionedRef.current) {
      isPositionedRef.current = true;
      // Recalculate once more after a brief delay to use actual measured height
      setTimeout(() => {
        setCalculatedPosition(calculatePosition());
      }, 50);
    }
  }, [step, targetPosition, currentStep, isMobile, isCenterPlacement]);

  // For center placement, no position styles needed - parent flexbox handles centering
  const position = isCenterPlacement ? {} : calculatedPosition;
  const isLastStep = currentStep === totalSteps;

  return (
    <motion.div
      ref={tooltipRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`${isCenterPlacement ? 'relative' : 'fixed'} z-[10000] bg-white rounded-xl shadow-2xl border border-gray-200 max-w-[380px]`}
      style={{
        ...(position || {}),
        maxHeight: isMobile ? 'calc(100vh - 80px)' : '80vh',
        overflowY: 'auto',
      }}
    >
      {/* Trosmi mascot - Top-left corner */}
      <div className="absolute -top-10 -left-6 w-20 h-20 lg:-top-12 lg:-left-8 lg:w-24 lg:h-24 pointer-events-none">
        <img
          src="/Brand_images/processed/Trosmi.png"
          alt="Trosmi"
          className="w-full h-full object-contain drop-shadow-lg"
          style={{ transform: 'scaleX(-1)' }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 pr-8">{step.title}</h3>
          <button
            onClick={onSkip}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none transition-colors"
            aria-label="Cerrar tutorial"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="text-gray-700 text-sm leading-relaxed mb-6 whitespace-pre-line">
          {step.content}
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-1.5 mb-6">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index + 1 === currentStep
                  ? 'w-8 bg-sky-500'
                  : index + 1 < currentStep
                  ? 'w-2 bg-sky-300'
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Progress Text */}
        <p className="text-center text-xs text-gray-500 mb-6">
          Paso {currentStep} de {totalSteps}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Previous button (only show if not first step) */}
          {onPrevious && (
            <Button variant="outline" onClick={onPrevious} className="flex-1">
              Anterior
            </Button>
          )}

          {/* Skip button */}
          <Button
            variant="ghost"
            onClick={onSkip}
            className="flex-1 text-gray-600 hover:text-gray-900"
          >
            Saltar tutorial
          </Button>

          {/* Next/Finish button */}
          <Button variant="primary" onClick={onNext} className="flex-1">
            {isLastStep ? '¡Entendido! 🎉' : 'Siguiente →'}
          </Button>
        </div>
      </div>

      {/* Arrow pointing to target (only for non-center placements on desktop) */}
      {step.placement !== 'center' && step.target !== 'center' && window.innerWidth >= 1024 && (
        <div
          className="absolute w-4 h-4 bg-white"
          style={{
            ...(step.placement === 'top' && {
              bottom: '-8px',
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              borderBottom: '1px solid #e5e7eb',
              borderRight: '1px solid #e5e7eb',
            }),
            ...(step.placement === 'bottom' && {
              top: '-8px',
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              borderTop: '1px solid #e5e7eb',
              borderLeft: '1px solid #e5e7eb',
            }),
            ...(step.placement === 'left' && {
              right: '-8px',
              top: '50%',
              transform: 'translateY(-50%) rotate(45deg)',
              borderTop: '1px solid #e5e7eb',
              borderRight: '1px solid #e5e7eb',
            }),
            ...(step.placement === 'right' && {
              left: '-8px',
              top: '50%',
              transform: 'translateY(-50%) rotate(45deg)',
              borderBottom: '1px solid #e5e7eb',
              borderLeft: '1px solid #e5e7eb',
            }),
          }}
        />
      )}
    </motion.div>
  );
}
