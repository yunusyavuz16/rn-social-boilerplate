import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {useCheckAuthQuery, useLoginMutation, useLogoutMutation} from '@store/api/authApi';
import {setUser, setLoading, logout as logoutAction} from '@store/slices/authSlice';
import type {LoginCredentials} from '../types/auth.types';

interface UseAuthRTKReturn {
  user: ReturnType<typeof useAppSelector<{auth: {user: any}}>>['auth']['user'];
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
  const {user, isAuthenticated, isLoading} = useAppSelector(state => state.auth);

  // Check auth on mount
  const {data: checkAuthData, isLoading: isCheckingAuth} = useCheckAuthQuery();
  const [loginMutation, {isLoading: isLoggingIn}] = useLoginMutation();
  const [logoutMutation, {isLoading: isLoggingOut}] = useLogoutMutation();

  // Update auth state from checkAuth query
  useEffect(() => {
    if (checkAuthData) {
      dispatch(setUser(checkAuthData.user));
      dispatch(setLoading(false));
    }
  }, [checkAuthData, dispatch]);

  // Update loading state
  useEffect(() => {
    dispatch(setLoading(isCheckingAuth || isLoggingIn || isLoggingOut));
  }, [isCheckingAuth, isLoggingIn, isLoggingOut, dispatch]);

  const login = async (credentials: LoginCredentials) => {
    try {
      const userData = await loginMutation({credentials}).unwrap();
      dispatch(setUser(userData));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(logoutAction());
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
};

