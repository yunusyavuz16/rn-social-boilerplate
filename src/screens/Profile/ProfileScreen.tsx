import React, {useState, useCallback} from 'react';
import {Alert, ActivityIndicator, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useAuthRTK} from '@hooks/useAuthRTK';
import {useTheme} from '@hooks/useTheme';
import {ThemedView} from '@components/ThemedView/ThemedView';
import {ThemedText} from '@components/ThemedText/ThemedText';
import {Avatar} from '@components/Avatar/Avatar';
import {Button} from '@components/Button/Button';
import {BackButton} from '@components/BackButton/BackButton';
import {createStyles} from './ProfileScreen.styles';
import type {NavigationProp} from '../../navigation/types';
import type {ThemeMode} from '@styles/theme';

/**
 * Profile screen displaying user information, theme switcher, and logout functionality
 */
export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<'Profile'>>();
  const {user, logout, isLoading: authLoading} = useAuthRTK();
  const {theme, mode, setTheme} = useTheme();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const styles = createStyles(theme);

  const handleLogout = useCallback(() => {
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
  }, [logout, navigation]);

  const handleThemeChange = useCallback(
    async (newMode: ThemeMode) => {
      await setTheme(newMode);
    },
    [setTheme],
  );

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

