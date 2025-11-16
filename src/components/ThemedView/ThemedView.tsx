import React from 'react';
import {View, ViewProps, StyleProp, ViewStyle} from 'react-native';
import {useTheme} from '@hooks/useTheme';

/**
 * Themed View component that automatically applies theme colors
 * Use this instead of View for consistent theming across the app
 */
export const ThemedView = React.memo<ViewProps>(
  ({style, ...props}) => {
    const {theme} = useTheme();

    const defaultStyle: StyleProp<ViewStyle> = {
      backgroundColor: theme.colors.background,
    };

    return <View style={[defaultStyle, style]} {...props} />;
  },
);

ThemedView.displayName = 'ThemedView';

