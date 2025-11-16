import React, {useState} from 'react';
import {TextInput} from 'react-native';
import {useTheme} from '@hooks/useTheme';
import {ThemedView} from '@components/ThemedView/ThemedView';
import {ThemedText} from '@components/ThemedText/ThemedText';
import {createStyles} from './Input.styles';
import type {InputProps} from './InputProps';

/**
 * Custom Input component with label and error handling
 */
export const Input = React.memo<InputProps>(
  ({
    label,
    error,
    containerStyle,
    inputStyle,
    secureTextEntry = false,
    testID,
    ...textInputProps
  }) => {
    const {theme} = useTheme();
    const styles = createStyles(theme);
    const [isFocused, setIsFocused] = useState(false);

    const inputStyleCombined = [
      styles.input,
      isFocused && styles.inputFocused,
      inputStyle,
    ];

    return (
      <ThemedView style={[styles.container, containerStyle]}>
        {label && <ThemedText style={styles.label}>{label}</ThemedText>}
        <TextInput
          {...textInputProps}
          secureTextEntry={secureTextEntry}
          style={inputStyleCombined}
          placeholderTextColor={theme.colors.textSecondary}
          onFocus={e => {
            setIsFocused(true);
            textInputProps.onFocus?.(e);
          }}
          onBlur={e => {
            setIsFocused(false);
            textInputProps.onBlur?.(e);
          }}
          testID={testID}
        />
        {error && <ThemedText style={styles.error}>{error}</ThemedText>}
      </ThemedView>
    );
  },
);

Input.displayName = 'Input';

