import type {StyleProp, TextStyle} from 'react-native';

export type IconFamily = 'MaterialIcons' | 'Ionicons' | 'FontAwesome';

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  family?: IconFamily;
  style?: StyleProp<TextStyle>;
  testID?: string;
}

