import {authService} from '@services/authService';
import {secureStorageService} from '@services/secureStorageService';
import type {AuthSession, LoginCredentials} from '../../types/auth.types';
import {baseApi} from './baseApi';

interface LoginParams {
  credentials: LoginCredentials;
}

interface CheckAuthResponse {
  session: AuthSession | null;
}

/**
 * Auth API slice with RTK Query
 * Handles authentication operations
 */
export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    /**
     * Login mutation
     */
    login: builder.mutation<AuthSession, LoginParams>({
      queryFn: async ({ credentials }) => {
        try {
          const session = await authService.login(credentials);
          const storageSuccess = await secureStorageService.storeRefreshToken(
            session.tokens.refreshToken,
          );
          if (!storageSuccess) {
            console.warn('Could not store refresh token securely');
          }
          return {
            data: session,
          };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Login failed',
            },
          };
        }
      },
      invalidatesTags: ['User'],
    }),

    /**
     * Logout mutation
     */
    logout: builder.mutation<null, void>({
      queryFn: async () => {
        try {
          await authService.logout();
          await secureStorageService.clearRefreshToken();
          // Return null for mutations that don't return meaningful data
          return {
            data: null,
          };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Logout failed',
            },
          };
        }
      },
      invalidatesTags: ['User', 'Post'],
    }),

    /**
     * Check auth status (for initial load)
     */
    checkAuth: builder.query<CheckAuthResponse, void>({
      queryFn: async () => {
        try {
          const refreshToken = await secureStorageService.getRefreshToken();
          if (refreshToken) {
            const session = await authService.refreshSession(refreshToken);
            await secureStorageService.storeRefreshToken(
              session.tokens.refreshToken,
            );
            return {
              data: { session },
            };
          }
          return {
            data: { session: null },
          };
        } catch (error) {
          console.warn('Refresh token invalid or expired', error);
          return {
            data: { session: null }, // Return null on error, don't throw
          };
        }
      },
      providesTags: ['User'],
    }),
  }),
});

export const {useLoginMutation, useLogoutMutation, useCheckAuthQuery} = authApi;
