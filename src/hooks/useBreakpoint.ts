import {useState, useEffect} from 'react';
import {Dimensions, ScaledSize} from 'react-native';
import {getBreakpoint, isTablet, isPhone, type Breakpoint} from '@utils/breakpoints';

interface UseBreakpointReturn {
  breakpoint: Breakpoint;
  isTablet: boolean;
  isPhone: boolean;
  width: number;
  height: number;
}

/**
 * Hook for responsive breakpoint detection
 * Returns current breakpoint, device type, and screen dimensions
 */
export const useBreakpoint = (): UseBreakpointReturn => {
  const [dimensions, setDimensions] = useState<ScaledSize>(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window}) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const breakpoint = getBreakpoint(dimensions.width);
  const tablet = isTablet(dimensions.width);
  const phone = isPhone(dimensions.width);

  return {
    breakpoint,
    isTablet: tablet,
    isPhone: phone,
    width: dimensions.width,
    height: dimensions.height,
  };
};

