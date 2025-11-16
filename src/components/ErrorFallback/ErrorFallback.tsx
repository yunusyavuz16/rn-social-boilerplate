import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from '@styles/theme';
import {Button} from '@components/Button/Button';

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
  const isDev = __DEV__;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>
        We're sorry, but something unexpected happened. Please try again.
      </Text>
      {isDev && (
        <View style={styles.errorDetails}>
          <Text style={styles.errorText}>{error.message}</Text>
          {error.stack && (
            <Text style={styles.stackTrace}>{error.stack}</Text>
          )}
        </View>
      )}
      <Button
        title="Try Again"
        onPress={resetErrorBoundary}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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

