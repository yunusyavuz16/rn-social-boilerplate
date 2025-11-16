import React from 'react';
import {View, Pressable} from 'react-native';
import {ImageWithThumbnail} from '@components/ImageWithThumbnail/ImageWithThumbnail';
import {PostVideo} from '@components/PostVideo/PostVideo';
import {styles} from './MediaGridItem.styles';
import type {MediaGridItemProps} from './MediaGridItemProps';

/**
 * Individual media grid item component
 * Videos auto-play when visible
 * Uses progressive image loading and optimized video player
 */
export const MediaGridItem = React.memo<MediaGridItemProps>(
  ({item, isVisible, onPress}) => {
    const content = (
      <View style={styles.container}>
        {item.type === 'image' ? (
          <ImageWithThumbnail
            uri={item.uri}
            thumbnailUri={item.thumbnail}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <PostVideo video={item} paused={!isVisible} />
        )}
      </View>
    );

    if (onPress) {
      return (
        <Pressable onPress={onPress} style={styles.pressable}>
          {content}
        </Pressable>
      );
    }

    return content;
  },
);

MediaGridItem.displayName = 'MediaGridItem';

