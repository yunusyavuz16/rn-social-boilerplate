import {API_CONFIG} from '@constants/api.constants';
import type {
  AuthSession,
  AuthTokens,
  LoginCredentials,
  User,
} from '../types/auth.types';

class AuthService {
  private readonly tokenExpirySeconds = 15 * 60;

  /**
   * Mock login - accepts any credentials and returns success + tokens
   */
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    return new Promise((resolve, reject) => {
      try {
      setTimeout(() => {
        const username = credentials.username?.trim() || 'user';
          if (!username) {
            reject(new Error('Username is required'));
            return;
          }
        resolve({
          user: this.buildUser(username),
          tokens: this.createTokenPair(username),
        });
      }, API_CONFIG.MOCK_DELAY);
      } catch (error) {
        reject(error instanceof Error ? error : new Error('Login failed'));
      }
    });
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshSession(refreshToken: string): Promise<AuthSession> {
    return new Promise((resolve, reject) => {
      try {
        if (!refreshToken || typeof refreshToken !== 'string') {
          reject(new Error('Refresh token is required'));
          return;
        }

      setTimeout(() => {
        const username = this.extractUsernameFromToken(refreshToken);
        if (!username) {
          reject(new Error('Invalid refresh token'));
          return;
        }

        resolve({
          user: this.buildUser(username),
          tokens: this.createTokenPair(username),
        });
      }, API_CONFIG.MOCK_DELAY);
      } catch (error) {
        reject(error instanceof Error ? error : new Error('Token refresh failed'));
      }
    });
  }

  /**
   * Mock logout
   */
  async logout(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, API_CONFIG.MOCK_DELAY);
    });
  }

  private buildUser(username: string = 'user'): User {
    return {
      id: `user_${username}`,
      username,
      email: `${username}@example.com`,
      avatar: undefined,
    };
  }

  private createTokenPair(username: string = 'user'): AuthTokens {
    const timestamp = Date.now();
    return {
      accessToken: `access::${username}::${timestamp}`,
      refreshToken: `refresh::${username}::${timestamp}`,
      expiresIn: this.tokenExpirySeconds,
    };
  }

  private extractUsernameFromToken(token: string): string | null {
    if (!token || typeof token !== 'string' || !token.startsWith('refresh::')) {
      return null;
    }

    const parts = token.split('::');
    if (parts.length < 2) {
      return null;
    }

    const username = parts[1];
    return username && username.trim().length > 0 ? username.trim() : null;
  }
}

export const authService = new AuthService();

