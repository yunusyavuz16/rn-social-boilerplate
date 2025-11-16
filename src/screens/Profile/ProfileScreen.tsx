import React, {useState, useCallback} from 'react';
import {View, Text, Alert, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useAuthRTK} from '@hooks/useAuthRTK';
import {Avatar} from '@components/Avatar/Avatar';
import {Button} from '@components/Button/Button';
import {BackButton} from '@components/BackButton/BackButton';
import {styles} from './ProfileScreen.styles';
import type {NavigationProp} from '../../navigation/types';
import {theme} from '@styles/theme';

/**
 * Profile screen displaying user information and logout functionality
 */
export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<'Profile'>>();
  const {user, logout, isLoading: authLoading} = useAuthRTK();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  if (authLoading || !user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
      </View>
      <View style={styles.content}>
        {/* Profile Header */}
        <View style={styles.header}>
          <Avatar uri={user.avatar} username={user.username} size={80} />
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>42</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>1.2K</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>856</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>

          <Button
            title={isLoggingOut ? 'Logging out...' : 'Logout'}
            onPress={handleLogout}
            loading={isLoggingOut}
            disabled={isLoggingOut}
            variant="secondary"
            style={[styles.actionButton, styles.logoutButton]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

