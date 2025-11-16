import {StyleSheet} from 'react-native';
import type {Theme} from '@styles/theme';

/**
 * Create styles based on theme
 */
export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      marginTop: theme.spacing.md,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.textSecondary,
      fontWeight: theme.typography.fontWeight.regular,
    },
  });

