import React from 'react';
import {View, ActivityIndicator, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './LoadingScreen.styles';
import {theme} from '@styles/theme';

/**
 * Loading screen component
 * Displays a centered loading indicator with text
 */
export const LoadingScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.text}>Loading...</Text>
      </View>
    </SafeAreaView>
  );
};

