import {Dimensions, PixelRatio, ScaledSize} from 'react-native';
import {getBreakpoint, isTablet, type Breakpoint} from './breakpoints';

let screenData: ScaledSize = Dimensions.get('window');

// Update screen data when dimensions change
Dimensions.addEventListener('change', ({window}) => {
  screenData = window;
});

/**
 * Responsive utility functions for screen size calculations
 * Enhanced with breakpoint support
 */

/**
 * Get screen width
 */
export const getScreenWidth = (): number => screenData.width;

/**
 * Get screen height
 */
export const getScreenHeight = (): number => screenData.height;

/**
 * Get current breakpoint
 */
export const getCurrentBreakpoint = (): Breakpoint => {
  return getBreakpoint(screenData.width);
};

/**
 * Check if device is tablet
 */
export const isTabletDevice = (): boolean => {
  return isTablet(screenData.width);
};

/**
 * Convert width percentage to pixels
 * @param widthPercent - Percentage of screen width (0-100)
 */
export const widthPercentageToDP = (widthPercent: number): number => {
  const elemWidth = parseFloat(widthPercent.toString());
  return PixelRatio.roundToNearestPixel((screenData.width * elemWidth) / 100);
};

/**
 * Convert height percentage to pixels
 * @param heightPercent - Percentage of screen height (0-100)
 */
export const heightPercentageToDP = (heightPercent: number): number => {
  const elemHeight = parseFloat(heightPercent.toString());
  return PixelRatio.roundToNearestPixel((screenData.height * elemHeight) / 100);
};

/**
 * Get responsive font size based on screen width and breakpoint
 * @param size - Base font size
 * @param breakpointScale - Optional scale factor based on breakpoint
 */
export const normalizeFontSize = (size: number, breakpointScale?: number): number => {
  const baseWidth = 375; // Base width (iPhone X)
  const scale = breakpointScale || screenData.width / baseWidth;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Get responsive spacing based on breakpoint
 * @param size - Base spacing size
 * @param breakpointScale - Optional scale factor based on breakpoint
 */
export const normalizeSpacing = (size: number, breakpointScale?: number): number => {
  const baseWidth = 375;
  const scale = breakpointScale || screenData.width / baseWidth;
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

/**
 * Get responsive value based on breakpoint
 * @param values - Object with breakpoint keys and corresponding values
 */
export const getResponsiveValue = <T>(values: Partial<Record<Breakpoint, T>>): T | undefined => {
  const breakpoint = getCurrentBreakpoint();
  return values[breakpoint];
};

