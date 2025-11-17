import {interpolate, type SharedValue} from 'react-native-reanimated';

type DotAnimatedStyleFactoryParams = {
  scrollX: SharedValue<number>;
  screenWidth: number;
  index: number;
};

type DotAnimatedStyleWorklet = () => {
  transform: {scale: number}[];
  opacity: number;
};

/**
 * Returns the worklet used by useAnimatedStyle for pagination dots.
 */
export const getDotAnimatedStyleFactory = ({
  scrollX,
  screenWidth,
  index,
}: DotAnimatedStyleFactoryParams): DotAnimatedStyleWorklet => {
  return () => {
    'worklet';

    const inputRange = [
      (index - 1) * screenWidth,
      index * screenWidth,
      (index + 1) * screenWidth,
    ];

    const scale = interpolate(scrollX.value, inputRange, [0.8, 1.2, 0.8], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const opacity = interpolate(scrollX.value, inputRange, [0.5, 1, 0.5], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    return {
      transform: [{scale}],
      opacity,
    };
  };
};

