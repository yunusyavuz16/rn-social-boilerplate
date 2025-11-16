import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {CustomVideo} from '@components/CustomVideo';
import type {MediaItem} from '../../types/post.types';
import {styles} from './PostVideo.styles';

interface PostVideoProps {
  video: MediaItem;
  paused?: boolean;
}

/**
 * Video player component for posts with aggressive memory management
 * CRITICAL: Uses minimal buffers and bitrate limits to prevent OOM crashes
 * Includes thumbnail fallback when paused
 */
export const PostVideo = React.memo<PostVideoProps>(({video, paused = false}) => {
  const getVideoSource = (uri: string | number) => {
    if (typeof uri === 'string') {
      return {uri};
    }
    return uri as any;
  };

  const getThumbnailSource = () => {
    // Use video thumbnail if available, otherwise use a placeholder
    if (video.thumbnail) {
      return typeof video.thumbnail === 'string' ? {uri: video.thumbnail} : video.thumbnail;
    }
    return null;
  };

  const thumbnailSource = getThumbnailSource();

  // CRITICAL: Don't render Video component if paused to save memory
  // This prevents ExoPlayer from consuming memory when video is off-screen
  if (paused) {
    return (
      <View style={styles.container}>
        {thumbnailSource ? (
          <FastImage
            source={thumbnailSource}
            style={styles.video}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : (
          <View style={[styles.video, {backgroundColor: '#000000'}]} />
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Thumbnail fallback (shown behind video) */}
      {thumbnailSource && (
        <FastImage
          source={thumbnailSource}
          style={styles.thumbnail}
          resizeMode={FastImage.resizeMode.cover}
        />
      )}
      <CustomVideo
        source={getVideoSource(video.uri)}
        paused={false}
        style={styles.video}
        duration={video.duration}
        showTimer={true}
        enableTapToPlay={true}
        showPlayButton={true}
      />
    </View>
  );
});

PostVideo.displayName = 'PostVideo';
