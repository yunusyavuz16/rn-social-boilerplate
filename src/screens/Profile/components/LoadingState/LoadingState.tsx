import React from 'react';
import {ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemedView} from '@/components/Atoms/ThemedView/ThemedView';
import type {ProfileStyles} from '../../ProfileScreen.styles';

export interface LoadingStateProps {
  styles: ProfileStyles;
  spinnerColor: string;
}

/**
 * Displays a centered loading indicator while profile data resolves.
 */
export const LoadingState: React.FC<LoadingStateProps> = ({
  styles,
  spinnerColor,
}) => (
  <SafeAreaView style={styles.container}>
    <ThemedView style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={spinnerColor} />
    </ThemedView>
  </SafeAreaView>
);

