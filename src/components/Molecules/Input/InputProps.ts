import type {StyleProp, ViewStyle, TextInputProps} from 'react-native';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  secureTextEntry?: boolean;
  testID?: string;
}

