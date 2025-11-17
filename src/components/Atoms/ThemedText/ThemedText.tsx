import React from 'react';
import { Text, TextProps, StyleProp, TextStyle } from 'react-native';
import { useTheme } from '@hooks/useTheme';

/**
 * Themed Text component that automatically applies theme colors
 * Use this instead of Text for consistent theming across the app
 */
export const ThemedText: React.FC<TextProps> = ({ style, ...props }) => {
  const { theme } = useTheme();

  const defaultStyle: StyleProp<TextStyle> = {
    color: theme.colors.text,
  };

  return <Text style={[defaultStyle, style]} {...props} />;
};

ThemedText.displayName = 'ThemedText';
