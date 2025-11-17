import { StyleSheet } from 'react-native';
import type { Theme } from '@styles/theme';

/**
 * Creates themed styles for the custom video timer component.
 */
export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    timerContainer: {
      position: 'absolute',
      top: theme.spacing.md,
      right: theme.spacing.md,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderRadius: theme.borderRadius.sm,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      zIndex: 10,
    },
    timerText: {
      color: theme.colors.white,
      fontSize: theme.typography.fontSize.xs,
      fontWeight: theme.typography.fontWeight.semibold,
      fontFamily: 'monospace',
    },
  });

