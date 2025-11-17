import {API_CONFIG} from '@constants/api.constants';
import type {User, LoginCredentials} from '../types/auth.types';

class AuthService {
  /**
   * Mock login - accepts any credentials and returns success
   */
  async login(credentials: LoginCredentials): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: `user_${Date.now()}`,
          username: credentials.username || 'user',
          email: `${credentials.username || 'user'}@example.com`,
          avatar: undefined,
        };
        resolve(user);
      }, API_CONFIG.MOCK_DELAY);
    });
  }

  /**
   * Mock logout
   */
  async logout(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, API_CONFIG.MOCK_DELAY);
    });
  }
}

export const authService = new AuthService();

