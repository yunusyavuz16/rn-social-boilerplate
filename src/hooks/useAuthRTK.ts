import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {useCheckAuthQuery, useLoginMutation, useLogoutMutation} from '@store/api/authApi';
import {setSession, clearSession, setLoading} from '@store/slices/authSlice';
import type {LoginCredentials, User} from '../types/auth.types';

interface UseAuthRTKReturn {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

/**
 * Hook for authentication state and operations with RTK Query
 */
export const useAuthRTK = (): UseAuthRTKReturn => {
  const dispatch = useAppDispatch();
  const {user, accessToken, isAuthenticated, isLoading} = useAppSelector(state => state.auth);

  // Check auth on mount
  const {data: checkAuthData, isLoading: isCheckingAuth} = useCheckAuthQuery();
  const [loginMutation, {isLoading: isLoggingIn}] = useLoginMutation();
  const [logoutMutation, {isLoading: isLoggingOut}] = useLogoutMutation();

  // Update auth state from checkAuth query
  useEffect(() => {
    if (checkAuthData) {
      if (checkAuthData.session) {
        dispatch(
          setSession({
            user: checkAuthData.session.user,
            accessToken: checkAuthData.session.tokens.accessToken,
          }),
        );
      } else {
        dispatch(clearSession());
      }
      dispatch(setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkAuthData]);

  // Update loading state
  useEffect(() => {
    dispatch(setLoading(isCheckingAuth || isLoggingIn || isLoggingOut));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheckingAuth, isLoggingIn, isLoggingOut]);

  const login = async (credentials: LoginCredentials) => {
    try {
      const session = await loginMutation({credentials}).unwrap();
      dispatch(
        setSession({
          user: session.user,
          accessToken: session.tokens.accessToken,
        }),
      );
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(clearSession());
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  return {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
};

