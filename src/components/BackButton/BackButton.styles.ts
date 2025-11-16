import {StyleSheet} from 'react-native';
import type {Theme} from '@styles/theme';

/**
 * Create styles based on theme
 */
export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      padding: theme.spacing.xs,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

