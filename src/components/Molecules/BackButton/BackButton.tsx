import { Icon } from '@/components/Atoms/Icon/Icon';
import { useTheme } from '@hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, ViewStyle } from 'react-native';
import { createStyles } from './BackButton.styles';
import { BackButtonProps } from './BackButtonProps';

/**
 * Reusable back button component
 * Navigates back by default or uses custom onPress handler
 * Supports dark mode theming
 */
export const BackButton:React.FC<BackButtonProps> = ({
  onPress,
  iconColor,
  iconSize = 24,
  style,
  testID,
  accessibilityLabel = 'Go back',
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  const containerStyle: ViewStyle[] = style ? [styles.container, style] : [styles.container];

  // Use provided iconColor or default to theme text color
  const defaultIconColor = iconColor || theme.colors.text;

  return (
    <Pressable
      onPress={handlePress}
      style={containerStyle}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button">
      <Icon name="arrow-back" size={iconSize} color={defaultIconColor} family="Ionicons" />
    </Pressable>
  );
};

BackButton.displayName = 'BackButton';
