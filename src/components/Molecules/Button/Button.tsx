import { useTheme } from '@hooks/useTheme';
import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { createStyles } from './Button.styles';
import type { ButtonProps } from './ButtonProps';

/**
 * Custom Button component with loading and disabled states
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  style,
  textStyle,
  testID,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const containerStyle = [
    styles.container,
    variant === 'primary' ? styles.primary : styles.secondary,
    disabled && styles.disabled,
    style,
  ];

  const textStyleCombined = [
    styles.text,
    variant === 'secondary' && styles.secondaryText,
    textStyle,
  ];

  const getIndicatorColor = () => {
    if (variant === 'primary') {
      return theme.mode === 'dark' ? theme.colors.black : theme.colors.white;
    }
    return theme.colors.text;
  };

  const indicatorColor = getIndicatorColor();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={containerStyle}
      testID={testID}>
      {loading ? (
        <ActivityIndicator color={indicatorColor} size="small" />
      ) : (
        <Text style={textStyleCombined}>{title}</Text>
      )}
    </Pressable>
  );
};

Button.displayName = 'Button';
