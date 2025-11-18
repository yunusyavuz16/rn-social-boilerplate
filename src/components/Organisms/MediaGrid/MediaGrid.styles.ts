import { Breakpoint } from '@/utils/breakpoints';
import { getResponsiveFontSize, getResponsiveSpacing, type Theme } from '@styles/theme';
import { StyleSheet } from 'react-native';

/**
 * Create styles based on theme
 */
export const createStyles = (theme: Theme, breakpoint: Breakpoint) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    grid: {
      flex: 1,
    },
    gridItem: {
      flex: 1,
      margin: 1,
    },
    endMessage: {
      paddingVertical: getResponsiveSpacing('md', breakpoint),
      alignItems: 'center',
    },
    endMessageText: {
      fontSize: getResponsiveFontSize('sm', breakpoint),
      color: theme.colors.textSecondary,
    },
    footerLoader: {
      paddingVertical: getResponsiveSpacing('md', breakpoint),
      alignItems: 'center',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: getResponsiveSpacing('xxl', breakpoint),
    },
  });
