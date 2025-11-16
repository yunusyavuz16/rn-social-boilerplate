import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {ImageWithThumbnail} from '@components/ImageWithThumbnail/ImageWithThumbnail';
import {PostVideo} from '@components/PostVideo/PostVideo';
import {createStyles} from './MediaGridItem.styles';
import {useTheme} from '@hooks/useTheme';
import type {MediaGridItemProps} from './MediaGridItemProps';

/**
 * Individual media grid item component
 * Videos auto-play when visible
 * Uses progressive image loading and optimized video player
 * All child components have pointerEvents="none" to allow parent TouchableOpacity to handle presses
 */
export const MediaGridItem = React.memo<MediaGridItemProps>(
  ({item, isVisible, onPress}) => {
    const {theme} = useTheme();
    const styles = createStyles(theme);

    const content = (
      <View style={styles.container} pointerEvents="none">
        {item.type === 'image' ? (
          <ImageWithThumbnail
            uri={item.uri}
            thumbnailUri={item.thumbnail}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <PostVideo
            video={item}
            paused={!isVisible}
            isVisible={false}
            showPlayButton={false}
            showTimer={true}
            enableTapToPlay={false}
          />
        )}
      </View>
    );

    if (onPress) {
      return (
        <TouchableOpacity
          onPress={onPress}
          style={styles.pressable}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={`View post with ${item.type}`}>
          {content}
        </TouchableOpacity>
      );
    }

    return content;
  },
);

MediaGridItem.displayName = 'MediaGridItem';

