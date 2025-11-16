/**
 * Breakpoint system for responsive design
 * Defines screen width breakpoints for different device sizes
 */
export const BREAKPOINTS = {
  xs: 0,
  sm: 375,
  md: 768,
  lg: 1024,
  xl: 1440,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Get current breakpoint based on screen width
 */
export const getBreakpoint = (width: number): Breakpoint => {
  if (width >= BREAKPOINTS.xl) return 'xl';
  if (width >= BREAKPOINTS.lg) return 'lg';
  if (width >= BREAKPOINTS.md) return 'md';
  if (width >= BREAKPOINTS.sm) return 'sm';
  return 'xs';
};

/**
 * Check if screen is tablet size
 */
export const isTablet = (width: number): boolean => {
  return width >= BREAKPOINTS.md;
};

/**
 * Check if screen is phone size
 */
export const isPhone = (width: number): boolean => {
  return width < BREAKPOINTS.md;
};

