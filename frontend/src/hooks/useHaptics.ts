import { useCallback } from 'react';

type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' | 'selection';

/**
 * Custom hook for haptic feedback on mobile devices
 * Uses Vibration API with different patterns for different interaction types
 */
export function useHaptics() {
  const triggerHaptic = useCallback((type: HapticType = 'light') => {
    // Check if vibration API is supported
    if (!navigator.vibrate) {
      return;
    }

    // Define vibration patterns for different haptic types
    const patterns: Record<HapticType, number | number[]> = {
      light: 10,        // Quick tap (10ms)
      medium: 20,       // Medium tap (20ms)
      heavy: 30,        // Heavy tap (30ms)
      success: [10, 50, 10],  // Double tap for success
      warning: [15, 30, 15],  // Warning pattern
      error: [30, 50, 30, 50, 30],  // Triple pulse for error
      selection: 5,     // Very light for selections/scrolling
    };

    const pattern = patterns[type];

    try {
      if (Array.isArray(pattern)) {
        navigator.vibrate(pattern);
      } else {
        navigator.vibrate(pattern);
      }
    } catch (error) {
      // Silently fail if vibration is not supported or blocked
      console.debug('Haptic feedback not available');
    }
  }, []);

  return { triggerHaptic };
}
