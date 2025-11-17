import { useTheme } from '@hooks/useTheme';
import React from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';

/**
 * Themed View component that automatically applies theme colors
 * Use this instead of View for consistent theming across the app
 */
export const ThemedView: React.FC<ViewProps> = ({ style, ...props }) => {
  const { theme } = useTheme();

  const defaultStyle: StyleProp<ViewStyle> = {
    backgroundColor: theme.colors.background,
  };

  return <View style={[defaultStyle, style]} {...props} />;
};

ThemedView.displayName = 'ThemedView';
