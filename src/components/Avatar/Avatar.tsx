import React from 'react';
import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {createStyles} from './Avatar.styles';
import {useTheme} from '@hooks/useTheme';
import type {AvatarProps} from './AvatarProps';

/**
 * Avatar component for user profile pictures
 */
export const Avatar = React.memo<AvatarProps>(
  ({uri, username, size = 32}) => {
    const {theme} = useTheme();
    const styles = createStyles(theme);

    const getInitials = (name: string): string => {
      if (!name) return '?';
      const parts = name.trim().split(' ');
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      }
      return name[0].toUpperCase();
    };

    const avatarStyle = [
      styles.container,
      {width: size, height: size, borderRadius: size / 2},
    ];
    const textStyle = [styles.initials, {fontSize: size * 0.4}];

    if (uri) {
      const imageSource =
        typeof uri === 'string' ? {uri} : (uri as {uri: string} | number);
      return (
        <View style={avatarStyle}>
          <FastImage
            source={imageSource}
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      );
    }

    return (
      <View style={[avatarStyle, styles.placeholder]}>
        <Text style={textStyle}>{getInitials(username || 'U')}</Text>
      </View>
    );
  },
);

Avatar.displayName = 'Avatar';

