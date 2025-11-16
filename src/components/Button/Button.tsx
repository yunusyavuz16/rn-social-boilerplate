import React from 'react';
import {Pressable, Text, ActivityIndicator} from 'react-native';
import {styles} from './Button.styles';
import type {ButtonProps} from './ButtonProps';

/**
 * Custom Button component with loading and disabled states
 */
export const Button = React.memo<ButtonProps>(
  ({
    title,
    onPress,
    disabled = false,
    loading = false,
    variant = 'primary',
    style,
    textStyle,
    testID,
  }) => {
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

    return (
      <Pressable
        onPress={onPress}
        disabled={disabled || loading}
        style={containerStyle}
        testID={testID}>
        {loading ? (
          <ActivityIndicator
            color={variant === 'primary' ? '#FFFFFF' : '#000000'}
            size="small"
          />
        ) : (
          <Text style={textStyleCombined}>{title}</Text>
        )}
      </Pressable>
    );
  },
);

Button.displayName = 'Button';

