import { ThemedView } from '@/components/Atoms/ThemedView/ThemedView';
import { BackButton } from '@/components/Molecules/BackButton/BackButton';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionsSection } from './components/ActionsSection/ActionsSection';
import { LoadingState } from './components/LoadingState/LoadingState';
import { ProfileHeaderSection } from './components/ProfileHeaderSection/ProfileHeaderSection';
import { StatsSection } from './components/StatsSection/StatsSection';
import { ThemeSwitcherSection } from './components/ThemeSwitcherSection/ThemeSwitcherSection';
import { useProfileScreenData } from './hooks/useProfileScreenData';

/**
 * Profile screen displaying user information, theme switcher, and logout functionality
 */
export const ProfileScreen: React.FC = () => {
  const { authLoading, user, styles, isLoggingOut, handleLogout, theme } =
    useProfileScreenData();

  if (authLoading || !user) {
    return <LoadingState styles={styles} spinnerColor={theme.colors.primary} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <BackButton />
      </ThemedView>
      <ThemedView style={styles.content}>
        <ProfileHeaderSection user={user} styles={styles} />
        <StatsSection styles={styles} />
        <ThemeSwitcherSection  styles={styles}  />
        <ActionsSection styles={styles} isLoggingOut={isLoggingOut} onLogout={handleLogout} />
      </ThemedView>
    </SafeAreaView>
  );
};
