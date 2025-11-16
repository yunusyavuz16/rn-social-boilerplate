/**
 * Theme configuration with colors, spacing, and typography tokens
 * Supports light and dark mode
 */

export type ThemeMode = 'light' | 'dark';

export const lightColors = {
  primary: '#000000',
  secondary: '#8E8E93',
  background: '#FFFFFF',
  surface: '#F2F2F7',
  error: '#FF3B30',
  success: '#34C759',
  border: '#E5E5EA',
  text: '#000000',
  textSecondary: '#8E8E93',
  white: '#FFFFFF',
  black: '#000000',
  like: '#FF3040',
  transparent: 'transparent',
} as const;

export const darkColors = {
  primary: '#FFFFFF',
  secondary: '#8E8E93',
  background: '#000000',
  surface: '#1C1C1E',
  error: '#FF453A',
  success: '#30D158',
  border: '#38383A',
  text: '#FFFFFF',
  textSecondary: '#8E8E93',
  white: '#FFFFFF',
  black: '#000000',
  like: '#FF3040',
  transparent: 'transparent',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
  },
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999,
} as const;

/**
 * Get theme colors based on mode
 */
export const getThemeColors = (mode: ThemeMode) => {
  return mode === 'light' ? lightColors : darkColors;
};

/**
 * Create theme object for a specific mode
 */
export const createTheme = (mode: ThemeMode) => {
  return {
    mode,
    colors: getThemeColors(mode),
    spacing,
    typography,
    borderRadius,
  } as const;
};

export type Theme = ReturnType<typeof createTheme>;

