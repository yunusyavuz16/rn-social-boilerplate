import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {useTheme} from '@hooks/useTheme';
import {ThemedView} from '@/components/Atoms/ThemedView/ThemedView';
import {ThemedText} from '@/components/Atoms/ThemedText/ThemedText';
import {Icon} from '@/components/Atoms/Icon/Icon';
import {ICONS} from '@constants/icons.constants';
import {createTheme} from '@styles/theme';

export type EmptyStateType = 'search' | 'feed' | 'network' | 'generic';

interface EmptyStateProps {
  type?: EmptyStateType;
  title?: string;
  message?: string;
  onRetry?: () => void;
}

/**
 * Empty state component for various scenarios
 * Supports search, feed, network error, and generic empty states
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'generic',
  title,
  message,
  onRetry,
}) => {
  const getContent = () => {
    switch (type) {
      case 'search':
        return {
          icon: ICONS.SEARCH,
          defaultTitle: 'No results found',
          defaultMessage: 'Try searching with different keywords',
        };
      case 'feed':
        return {
          icon: ICONS.IMAGE_OUTLINE,
          defaultTitle: 'No posts yet',
          defaultMessage: 'Check back later for new content',
        };
      case 'network':
        return {
          icon: ICONS.WIFI_OUTLINE,
          defaultTitle: 'Connection error',
          defaultMessage: 'Please check your internet connection and try again',
        };
      default:
        return {
          icon: ICONS.ALERT_CIRCLE_OUTLINE,
          defaultTitle: 'Nothing here',
          defaultMessage: 'There is no content to display',
        };
    }
  };

  const {theme} = useTheme();
  const styles = createStyles(theme);
  const content = getContent();

  return (
    <ThemedView style={styles.container}>
      <Icon
        name={content.icon}
        size={64}
        color={theme.colors.textSecondary}
        family="Ionicons"
        style={styles.icon}
      />
      <ThemedText style={styles.title}>{title || content.defaultTitle}</ThemedText>
      <ThemedText style={styles.message}>{message || content.defaultMessage}</ThemedText>
      {onRetry && type === 'network' && (
        <Pressable onPress={onRetry}>
          <ThemedText style={styles.retryHint}>Tap to retry</ThemedText>
        </Pressable>
      )}
    </ThemedView>
  );
};

const createStyles = (theme: ReturnType<typeof createTheme>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.xl,
    },
    icon: {
      marginBottom: theme.spacing.md,
    },
    title: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.semibold,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
      textAlign: 'center',
    },
    message: {
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: theme.spacing.md,
    },
    retryHint: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.primary,
      textDecorationLine: 'underline',
      marginTop: theme.spacing.sm,
    },
  });

