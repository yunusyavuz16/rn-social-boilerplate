import {useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useAuthRTK} from '@hooks/useAuthRTK';
import type {NavigationProp} from '../../navigation/types';

interface UseLoginReturn {
  username: string;
  password: string;
  isLoading: boolean;
  error: string | null;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  handleLogin: () => Promise<void>;
}

/**
 * Hook for login screen logic
 */
export const useLogin = (): UseLoginReturn => {
  const navigation = useNavigation<NavigationProp<'Login'>>();
  const {login} = useAuthRTK();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = useCallback(async () => {
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await login({username: username.trim(), password: password.trim()});
      // Navigate to Feed screen after successful login
      navigation.replace('Feed');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }, [username, password, login, navigation]);

  return {
    username,
    password,
    isLoading,
    error,
    setUsername,
    setPassword,
    handleLogin,
  };
};

