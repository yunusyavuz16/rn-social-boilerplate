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
    return new Promise(resolve => {
      setTimeout(() => {
        const username = credentials.username?.trim() || 'user';
        resolve({
          user: this.buildUser(username),
          tokens: this.createTokenPair(username),
        });
      }, API_CONFIG.MOCK_DELAY);
    });
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshSession(refreshToken: string): Promise<AuthSession> {
    return new Promise((resolve, reject) => {
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

  private buildUser(username: string): User {
    const safeUsername = username || 'user';
    return {
      id: `user_${safeUsername}`,
      username: safeUsername,
      email: `${safeUsername}@example.com`,
      avatar: undefined,
    };
  }

  private createTokenPair(username: string): AuthTokens {
    const timestamp = Date.now();
    const safeUsername = username || 'user';
    return {
      accessToken: `access::${safeUsername}::${timestamp}`,
      refreshToken: `refresh::${safeUsername}::${timestamp}`,
      expiresIn: this.tokenExpirySeconds,
    };
  }

  private extractUsernameFromToken(token: string): string | null {
    if (!token?.startsWith('refresh::')) {
      return null;
    }

    const [, username] = token.split('::');
    return username || null;
  }
}

export const authService = new AuthService();

