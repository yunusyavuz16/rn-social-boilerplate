import { useState } from 'react';

interface UseVideoErrorReturn {
  hasError: boolean;
  retryKey: number;
  handleError: (error: unknown) => void;
  resetError: () => void;
}

/**
 * Centralized error handler for the video component.
 * Keeps retry key state to force remounts and exposes helpers to reset errors.
 */
export const useVideoError = (): UseVideoErrorReturn => {
  const [hasError, setHasError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  const handleError = (error: unknown) => {
    console.error('Video load error:', error);
    setHasError(true);
  };

  const resetError = () => {
    setHasError(prev => {
      if (prev) {
        setRetryKey(key => key + 1);
      }
      return false;
    });
  };

  return {
    hasError,
    retryKey,
    handleError,
    resetError,
  };
};
