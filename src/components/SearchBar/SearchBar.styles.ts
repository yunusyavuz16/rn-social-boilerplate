import {StyleSheet} from 'react-native';
import type {Theme} from '@styles/theme';

/**
 * Create styles based on theme
 */
export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      minHeight: 40,
    },
    searchIcon: {
      marginRight: theme.spacing.sm,
    },
    input: {
      flex: 1,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
      padding: 0,
    },
  });

