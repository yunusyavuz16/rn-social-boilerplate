import { Avatar } from '@components/Avatar/Avatar';
import { BackButton } from '@components/BackButton/BackButton';
import { Button } from '@components/Button/Button';
import { ThemedText } from '@components/ThemedText/ThemedText';
import { ThemedView } from '@components/ThemedView/ThemedView';
import { useAuthRTK } from '@hooks/useAuthRTK';
import { useTheme } from '@hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import type { ThemeMode } from '@styles/theme';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NavigationProp } from '../../navigation/types';
import { createStyles } from './ProfileScreen.styles';

/**
 * Profile screen displaying user information, theme switcher, and logout functionality
 */
export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<'Profile'>>();
  const {user, logout, isLoading: authLoading} = useAuthRTK();
  const {theme, mode, setTheme} = useTheme();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const styles = createStyles(theme);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
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
          },
        },
      ],
    );
  }

  const handleThemeChange = async (newMode: ThemeMode) => {
    await setTheme(newMode);
  }

  if (authLoading || !user) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <BackButton />
      </ThemedView>
      <ThemedView style={styles.content}>
        {/* Profile Header */}
        <ThemedView style={styles.header}>
          <Avatar uri={user.avatar} username={user.username} size={80} />
          <ThemedText style={styles.username}>{user.username}</ThemedText>
          <ThemedText style={styles.email}>{user.email}</ThemedText>
        </ThemedView>

        {/* Stats */}
        <ThemedView style={styles.stats}>
          <ThemedView style={styles.statItem}>
            <ThemedText style={styles.statValue}>42</ThemedText>
            <ThemedText style={styles.statLabel}>Posts</ThemedText>
          </ThemedView>
          <ThemedView style={styles.statItem}>
            <ThemedText style={styles.statValue}>1.2K</ThemedText>
            <ThemedText style={styles.statLabel}>Followers</ThemedText>
          </ThemedView>
          <ThemedView style={styles.statItem}>
            <ThemedText style={styles.statValue}>856</ThemedText>
            <ThemedText style={styles.statLabel}>Following</ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Theme Switcher */}
        <ThemedView style={styles.themeSection}>
          <ThemedText style={styles.sectionTitle}>Theme</ThemedText>
          <ThemedView style={styles.themeOptions}>
            <Pressable
              style={[
                styles.themeOption,
                mode === 'light' && styles.themeOptionActive,
              ]}
              onPress={() => handleThemeChange('light')}>
              <ThemedText
                style={[
                  styles.themeOptionText,
                  mode === 'light' && styles.themeOptionTextActive,
                ]}>
                Light Mode
              </ThemedText>
            </Pressable>
            <Pressable
              style={[
                styles.themeOption,
                mode === 'dark' && styles.themeOptionActive,
              ]}
              onPress={() => handleThemeChange('dark')}>
              <ThemedText
                style={[
                  styles.themeOptionText,
                  mode === 'dark' && styles.themeOptionTextActive,
                ]}>
                Dark Mode
              </ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>

        {/* Actions */}
        <ThemedView style={styles.actions}>
          <Button
            title={isLoggingOut ? 'Logging out...' : 'Logout'}
            onPress={handleLogout}
            loading={isLoggingOut}
            disabled={isLoggingOut}
            variant="secondary"
            style={[styles.actionButton, styles.logoutButton]}
          />
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
};

