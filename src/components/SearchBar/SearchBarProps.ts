import type {TextInput} from 'react-native';

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  testID?: string;
}

export type SearchBarRef = TextInput;

