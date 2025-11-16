import {useCallback} from 'react';
import {storageService} from '@services/storageService';

/**
 * Hook for secure storage operations
 * Wraps storageService methods for credentials
 */
export const useSecureStorage = () => {
  const storeCredentials = useCallback(
    async (username: string, password: string) => {
      await storageService.storeCredentials(username, password);
    },
    [],
  );

  const getCredentials = useCallback(async () => {
    return await storageService.getCredentials();
  }, []);

  const clearCredentials = useCallback(async () => {
    await storageService.clearCredentials();
  }, []);

  return {
    storeCredentials,
    getCredentials,
    clearCredentials,
  };
};

