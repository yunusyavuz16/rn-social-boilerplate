import { useTheme } from '@hooks/useTheme';
import React, { forwardRef, useImperativeHandle } from 'react';
import { Text, View } from 'react-native';
import { useVideoTimer } from '../../hooks/useVideoTimer';
import { createStyles } from './CustomVideoTimer.styles';
import type { CustomVideoTimerProps, CustomVideoTimerRef } from './CustomVideoTimer.types';

export const CustomVideoTimer = forwardRef<CustomVideoTimerRef, CustomVideoTimerProps>(
  ({ duration, showTimer, hasError }, ref) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const { shouldShowTimer, formattedTime, updateFromProgress, reset } = useVideoTimer({
      duration,
      showTimer,
      hasError,
    });

    useImperativeHandle(
      ref,
      () => ({
        updateFromProgress,
        reset,
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );

    if (!shouldShowTimer || !formattedTime) {
      return null;
    }

    return (
      <View style={styles.timerContainer} pointerEvents="none">
        <Text style={styles.timerText}>{formattedTime}</Text>
      </View>
    );
  },
);

CustomVideoTimer.displayName = 'CustomVideoTimer';

export type { CustomVideoTimerProps, CustomVideoTimerRef } from './CustomVideoTimer.types';
