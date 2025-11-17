
import { storageService } from '@services/storageService';

/**
 * Hook for secure storage operations
 * Wraps storageService methods for credentials
 */
export const useSecureStorage = () => {
  const storeCredentials = async (username: string, password: string) => {
      await storageService.storeCredentials(username, password);
  }

  const getCredentials = async () => {
    return await storageService.getCredentials();
  }

  const clearCredentials = async () => {
    await storageService.clearCredentials();
  }

  return {
    storeCredentials,
    getCredentials,
    clearCredentials,
  };
};

