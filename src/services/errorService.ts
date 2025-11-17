export enum ErrorType {
  NETWORK = 'NETWORK',
  TIMEOUT = 'TIMEOUT',
  UNAUTHORIZED = 'UNAUTHORIZED',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN',
}

export interface AppError {
  type: ErrorType;
  message: string;
  originalError?: Error;
  retryable: boolean;
}

/**
 * Classify error type
 */
export const classifyError = (error: unknown): ErrorType => {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    if (message.includes('network') || message.includes('fetch')) {
      return ErrorType.NETWORK;
    }
    if (message.includes('timeout')) {
      return ErrorType.TIMEOUT;
    }
    if (message.includes('401') || message.includes('unauthorized')) {
      return ErrorType.UNAUTHORIZED;
    }
    if (message.includes('404') || message.includes('not found')) {
      return ErrorType.NOT_FOUND;
    }
    if (message.includes('500') || message.includes('server')) {
      return ErrorType.SERVER;
    }
  }
  return ErrorType.UNKNOWN;
};

/**
 * Get user-friendly error message
 */
export const getUserFriendlyMessage = (errorType: ErrorType): string => {
  switch (errorType) {
    case ErrorType.NETWORK:
      return 'Network error. Please check your connection and try again.';
    case ErrorType.TIMEOUT:
      return 'Request timed out. Please try again.';
    case ErrorType.UNAUTHORIZED:
      return 'Authentication failed. Please log in again.';
    case ErrorType.NOT_FOUND:
      return 'Content not found.';
    case ErrorType.SERVER:
      return 'Server error. Please try again later.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};

/**
 * Check if error is retryable
 */
export const isRetryable = (errorType: ErrorType): boolean => {
  return [
    ErrorType.NETWORK,
    ErrorType.TIMEOUT,
    ErrorType.SERVER,
  ].includes(errorType);
};

/**
 * Create AppError from unknown error
 */
export const createAppError = (error: unknown): AppError => {
  const errorType = classifyError(error);
  const originalError = error instanceof Error ? error : new Error(String(error));

  return {
    type: errorType,
    message: getUserFriendlyMessage(errorType),
    originalError,
    retryable: isRetryable(errorType),
  };
};

