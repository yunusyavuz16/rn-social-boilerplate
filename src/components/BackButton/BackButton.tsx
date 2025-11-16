import React from 'react';
import {Pressable, ViewStyle} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@hooks/useTheme';
import {Icon} from '@components/Icon/Icon';
import {createStyles} from './BackButton.styles';
import type {BackButtonProps} from './BackButtonProps';

/**
 * Reusable back button component
 * Navigates back by default or uses custom onPress handler
 * Supports dark mode theming
 */
export const BackButton = React.memo<BackButtonProps>(
  ({
    onPress,
    iconColor,
    iconSize = 24,
    style,
    testID,
    accessibilityLabel = 'Go back',
  }) => {
    const {theme} = useTheme();
    const styles = createStyles(theme);
    const navigation = useNavigation();

    const handlePress = () => {
      if (onPress) {
        onPress();
      } else {
        navigation.goBack();
      }
    };

    const containerStyle: ViewStyle[] = [styles.container, style].filter(
      (s): s is ViewStyle => s !== undefined,
    );

    // Use provided iconColor or default to theme text color
    const defaultIconColor = iconColor || theme.colors.text;

    return (
      <Pressable
        onPress={handlePress}
        style={containerStyle}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button">
        <Icon
          name="arrow-back"
          size={iconSize}
          color={defaultIconColor}
          family="Ionicons"
        />
      </Pressable>
    );
  },
);

BackButton.displayName = 'BackButton';

