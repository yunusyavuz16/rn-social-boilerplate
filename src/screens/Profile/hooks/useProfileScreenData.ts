import { useTheme } from '@/hooks/useTheme';
import { useAuthRTK } from '@hooks/useAuthRTK';
import type { NavigationProp } from '@navigation/types';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert } from 'react-native';
import { createStyles } from '../ProfileScreen.styles';

const showLogoutAlert = (onConfirm: () => void): void => {
  Alert.alert('Logout', 'Are you sure you want to logout?', [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {
      text: 'Logout',
      style: 'destructive',
      onPress: onConfirm,
    },
  ]);
};

/**
 * Hook encapsulating data and handlers for the profile screen.
 */
export const useProfileScreenData = () => {
  const navigation = useNavigation<NavigationProp<'Profile'>>();
  const { user, logout, isLoading: authLoading } = useAuthRTK();
  const { theme } = useTheme();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const styles = createStyles(theme);

  const handleLogoutConfirm = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to logout. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleLogout = () => {
    showLogoutAlert(() => {
      handleLogoutConfirm();
    });
  };

  return {
    authLoading,
    user,
    styles,
    theme,
    isLoggingOut,
    handleLogout,
  };
};
