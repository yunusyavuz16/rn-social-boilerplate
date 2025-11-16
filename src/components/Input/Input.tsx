import React, {useState} from 'react';
import {View, TextInput, Text} from 'react-native';
import {styles} from './Input.styles';
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
    const [isFocused, setIsFocused] = useState(false);

    const inputStyleCombined = [
      styles.input,
      isFocused && styles.inputFocused,
      inputStyle,
    ];

    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput
          {...textInputProps}
          secureTextEntry={secureTextEntry}
          style={inputStyleCombined}
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
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  },
);

Input.displayName = 'Input';

