import React from 'react';
import {ErrorBoundary as ReactErrorBoundary} from 'react-error-boundary';
import {ErrorFallback} from '@/components/Organisms/ErrorFallback/ErrorFallback';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * Global error boundary component
 * Catches JavaScript errors anywhere in the child component tree
 */
export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({children, onError}) => {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Log error for monitoring (e.g., Sentry, Crashlytics)
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    onError?.(error, errorInfo);
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={handleError}
      onReset={() => {
        // Reset app state if needed
      }}>
      {children}
    </ReactErrorBoundary>
  );
};

