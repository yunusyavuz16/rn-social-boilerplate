import React from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from '@hooks/useTheme';
import {ThemedView} from '@components/ThemedView/ThemedView';
import {ThemedText} from '@components/ThemedText/ThemedText';
import {Button} from '@components/Button/Button';
import {createTheme} from '@styles/theme';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

/**
 * Error fallback UI component
 * Displays user-friendly error message with retry option
 */
export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const isDev = __DEV__;

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Something went wrong</ThemedText>
      <ThemedText style={styles.message}>
        We're sorry, but something unexpected happened. Please try again.
      </ThemedText>
      {isDev && (
        <ThemedView style={styles.errorDetails}>
          <ThemedText style={styles.errorText}>{error.message}</ThemedText>
          {error.stack && (
            <ThemedText style={styles.stackTrace}>{error.stack}</ThemedText>
          )}
        </ThemedView>
      )}
      <Button
        title="Try Again"
        onPress={resetErrorBoundary}
        style={styles.button}
      />
    </ThemedView>
  );
};

const createStyles = (theme: ReturnType<typeof createTheme>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: theme.typography.fontSize.xl,
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
      textAlign: 'center',
    },
    message: {
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: theme.spacing.lg,
    },
    errorDetails: {
      width: '100%',
      padding: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing.lg,
    },
    errorText: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.error,
      fontFamily: 'monospace',
      marginBottom: theme.spacing.sm,
    },
    stackTrace: {
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.textSecondary,
      fontFamily: 'monospace',
    },
    button: {
      minWidth: 120,
    },
  });

