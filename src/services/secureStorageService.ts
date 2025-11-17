import * as Keychain from 'react-native-keychain';
import {STORAGE_KEYS} from '@constants/storage.constants';

/**
 * Secure storage service using react-native-keychain
 * Provides encrypted storage for sensitive data like credentials
 * Uses iOS Keychain and Android Keystore for secure storage
 */
class SecureStorageService {
  private readonly service = 'StoikkKeychain';

  async setItem(key: string, value: string): Promise<boolean> {
    try {
      await Keychain.setGenericPassword(key, value, {
        service: this.service,
      });
      return true;
    } catch (error) {
      // Log but don't throw (non-blocking)
      console.error('Error storing secure item:', error);
      return false;
    }
  }

  async getItem(key: string): Promise<string | null> {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: this.service,
      });

      if (credentials === false) {
        // No credentials found - this is normal
        return null;
      }

      // Check if the stored key matches the requested key
      if (credentials.username === key) {
        return credentials.password;
      }

      // Key doesn't match - return null
      return null;
    } catch (error) {
      // Actual error occurred - log it but still return null
      console.error('Error retrieving secure item:', error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      // Check if the item exists with this key
      const credentials = await Keychain.getGenericPassword({
        service: this.service,
      });

      if (credentials !== false && credentials.username === key) {
        await Keychain.resetGenericPassword({service: this.service});
      }
      // If item doesn't exist or key doesn't match, silently succeed
    } catch (error) {
      // Actual error occurred
      console.error('Error removing secure item:', error);
      // Don't throw - silently succeed
    }
  }

  async storeCredentials(
    username: string,
    password: string,
  ): Promise<boolean> {
    try {
      await Keychain.setGenericPassword(username, password, {
        service: this.service,
      });
      return true;
    } catch (error) {
      // Log but don't throw (non-blocking)
      console.error('Error storing credentials:', error);
      return false;
    }
  }

  async getCredentials(): Promise<{username: string; password: string} | null> {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: this.service,
      });

      if (credentials === false) {
        // No credentials found - this is normal
        return null;
      }

      return {
        username: credentials.username,
        password: credentials.password,
      };
    } catch (error) {
      // Actual error occurred - log it but still return null
      console.error('Error retrieving credentials:', error);
      return null;
    }
  }

  async clearCredentials(): Promise<void> {
    try {
      await Keychain.resetGenericPassword({service: this.service});
      // Also try to clear any legacy items if they exist
      await this.removeItem(STORAGE_KEYS.USER_DATA);
      await this.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    } catch (error) {
      // Log but don't throw - clearing is best effort
      console.error('Error clearing credentials:', error);
    }
  }

  async storeRefreshToken(token: string): Promise<boolean> {
    return this.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
  }

  async getRefreshToken(): Promise<string | null> {
    return this.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  async clearRefreshToken(): Promise<void> {
    await this.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }
}

export const secureStorageService = new SecureStorageService();

