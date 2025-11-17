import {StyleSheet} from 'react-native';
import type {Theme} from '@styles/theme';

/**
 * Create styles based on theme
 */
export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      overflow: 'hidden',
      backgroundColor: theme.colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    placeholder: {
      backgroundColor: theme.colors.primary,
    },
    initials: {
      color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
      fontWeight: theme.typography.fontWeight.bold,
    },
  });

