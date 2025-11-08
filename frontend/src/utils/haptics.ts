/**
 * Haptic feedback utilities for mobile devices
 * Uses the Vibration API for tactile feedback on interactions
 */

type HapticPattern = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';

const patterns: Record<HapticPattern, number | number[]> = {
  light: 10,
  medium: 20,
  heavy: 30,
  success: [10, 50, 10],
  warning: [15, 100, 15, 100, 15],
  error: [30, 100, 30],
};

export const haptic = (pattern: HapticPattern = 'light') => {
  // Check if the Vibration API is supported
  if ('vibrate' in navigator) {
    navigator.vibrate(patterns[pattern]);
  }
};

// Specific haptic functions for common interactions
export const haptics = {
  tap: () => haptic('light'),
  press: () => haptic('medium'),
  hold: () => haptic('heavy'),
  success: () => haptic('success'),
  warning: () => haptic('warning'),
  error: () => haptic('error'),
};
