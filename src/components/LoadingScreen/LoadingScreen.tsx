import React from 'react';
import {ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '@hooks/useTheme';
import {ThemedView} from '@components/ThemedView/ThemedView';
import {ThemedText} from '@components/ThemedText/ThemedText';
import {createStyles} from './LoadingScreen.styles';

/**
 * Loading screen component
 * Displays a centered loading indicator with text
 */
export const LoadingScreen: React.FC = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ThemedView style={styles.content}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <ThemedText style={styles.text}>Loading...</ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
};

