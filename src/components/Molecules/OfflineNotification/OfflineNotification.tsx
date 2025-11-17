import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Icon} from '@/components/Atoms/Icon/Icon';
import {useTheme} from '@hooks/useTheme';
import {useNetwork} from '@hooks/useNetwork';
import type {Theme} from '@styles/theme';
import type {OfflineNotificationProps} from './OfflineNotificationProps';

export const OfflineNotification: React.FC<OfflineNotificationProps> = ({
  position = 'top',
}) => {
  const {theme} = useTheme();
  const {isOnline, isInitialized} = useNetwork();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme);

  // Don't render until initialized
  if (!isInitialized) {
    return null;
  }

  // Don't render when online
  if (isOnline) {
    return null;
  }

  // Build container style with proper positioning and safe area insets
  const containerStyle = [
    styles.container,
    position === 'top'
      ? {
          paddingTop: insets.top,
        }
      : {
          paddingBottom: insets.bottom,
        },
    {
      backgroundColor: theme.colors.error,
    },
  ];

  return (
    <View style={containerStyle} testID="offline-notification">
      <View style={styles.content}>
        <Icon
          name="wifi-off"
          size={theme.typography.fontSize.lg}
          color={theme.colors.white}
          family="MaterialIcons"
        />
        <Text style={styles.text}>No internet connection</Text>
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
      shadowColor: theme.colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.sm,
      backgroundColor: theme.colors.transparent,
    },
    text: {
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.semibold,
      flexShrink: 1,
      color: theme.colors.white,
      textAlign: 'center',
    },
  });

OfflineNotification.displayName = 'OfflineNotification';

