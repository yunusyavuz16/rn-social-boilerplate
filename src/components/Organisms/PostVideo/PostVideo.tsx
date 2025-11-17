import { CustomVideo } from '@/components/Organisms/CustomVideo/CustomVideo';
import { useTheme } from '@hooks/useTheme';
import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import type { MediaItem } from '../../../types/post.types';
import { createStyles } from './PostVideo.styles';

interface PostVideoProps {
  video: MediaItem;
  paused?: boolean;
  isVisible?: boolean;
  showPlayButton?: boolean;
  showTimer?: boolean;
  enableTapToPlay?: boolean;
}

export const PostVideo: React.FC<PostVideoProps> = ({
  video,
  paused = false,
  isVisible = true,
  showPlayButton,
  showTimer,
  enableTapToPlay,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const getVideoSource = (uri: string | number) => {
    if (typeof uri === 'string') {
      return { uri };
    }
    return uri as any;
  };

  const getThumbnailSource = () => {
    // Use video thumbnail if available, otherwise use a placeholder
    if (video.thumbnail) {
      return typeof video.thumbnail === 'string' ? { uri: video.thumbnail } : video.thumbnail;
    }
    return null;
  };

  const thumbnailSource = getThumbnailSource();

  const shouldPause = paused || !isVisible;

  const shouldEnableTapToPlay = enableTapToPlay !== undefined ? enableTapToPlay : isVisible;

  const shouldShowPlayButton =
    showPlayButton !== undefined ? showPlayButton : shouldPause || shouldEnableTapToPlay;

  const shouldShowTimer = showTimer !== undefined ? showTimer : isVisible && !shouldPause;

  return (
    <View style={styles.container} pointerEvents={shouldEnableTapToPlay ? 'auto' : 'none'}>
      {thumbnailSource && shouldPause && (
        <FastImage
          source={thumbnailSource}
          style={styles.thumbnail}
          resizeMode={FastImage.resizeMode.cover}
          pointerEvents="none"
        />
      )}
      <CustomVideo
        source={getVideoSource(video.uri)}
        paused={shouldPause}
        duration={video.duration}
        showTimer={shouldShowTimer}
        enableTapToPlay={shouldEnableTapToPlay}
        showPlayButton={shouldShowPlayButton}
        muted={false}
        repeat={true}
        style={styles.video}
      />
    </View>
  );
};

PostVideo.displayName = 'PostVideo';
