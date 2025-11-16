import type {ViewStyle} from 'react-native';

export interface BackButtonProps {
  /**
   * Custom onPress handler. If not provided, uses navigation.goBack()
   */
  onPress?: () => void;
  /**
   * Icon color. Defaults to '#000000'
   */
  iconColor?: string;
  /**
   * Icon size. Defaults to 24
   */
  iconSize?: number;
  /**
   * Additional container styles
   */
  style?: ViewStyle;
  /**
   * Test ID for testing
   */
  testID?: string;
  /**
   * Accessibility label. Defaults to 'Go back'
   */
  accessibilityLabel?: string;
}

