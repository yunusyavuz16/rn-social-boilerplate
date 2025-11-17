import React from 'react';
import type { ViewStyle } from 'react-native';
import Animated, {
    type AnimatedStyle,
    type SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';

import { getDotAnimatedStyleFactory } from './utils/getDotAnimatedStyleFactory';

type PaginationDotProps = {
  index: number;
  scrollX: SharedValue<number>;
  screenWidth: number;
  isActive: boolean;
  dotStyle: AnimatedStyle<ViewStyle>;
  activeDotStyle: AnimatedStyle<ViewStyle>;
};

export const PaginationDotComponent: React.FC<PaginationDotProps> = ({
  index,
  scrollX,
  screenWidth,
  isActive,
  dotStyle,
  activeDotStyle,
}) => {
  const animatedStyle = useAnimatedStyle(
    getDotAnimatedStyleFactory({
      index,
      scrollX,
      screenWidth,
    }),
    [screenWidth, index],
  );

  return <Animated.View style={[dotStyle, isActive && activeDotStyle, animatedStyle]} />;
};

PaginationDotComponent.displayName = 'PaginationDot';
