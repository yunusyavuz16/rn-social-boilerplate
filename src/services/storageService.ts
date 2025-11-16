import {secureStorageService} from './secureStorageService';

/**
 * Storage service wrapper
 * Uses secure storage for sensitive data (credentials)
 * For non-sensitive data, AsyncStorage can still be used if needed
 */
class StorageService {
  /**
   * Store user credentials securely
   * Returns true if successful, false if failed (non-blocking)
   */
  async storeCredentials(
    username: string,
    password: string,
  ): Promise<boolean> {
    return secureStorageService.storeCredentials(username, password);
  }

  /**
   * Get user credentials from secure storage
   */
  async getCredentials(): Promise<{username: string; password: string} | null> {
    return secureStorageService.getCredentials();
  }

  /**
   * Clear user credentials
   */
  async clearCredentials(): Promise<void> {
    return secureStorageService.clearCredentials();
  }
}

export const storageService = new StorageService();

