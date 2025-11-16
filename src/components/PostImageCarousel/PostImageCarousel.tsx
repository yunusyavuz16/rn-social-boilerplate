import React, {useRef, useEffect} from 'react';
import {View, Dimensions} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';
import {useMediaCarousel} from '@hooks/useMediaCarousel';
import {useImagePrefetch} from '@hooks/useImagePrefetch';
import {ImageWithThumbnail} from '@components/ImageWithThumbnail/ImageWithThumbnail';
import {createStyles} from './PostImageCarousel.styles';
import {useTheme} from '@hooks/useTheme';
import type {MediaItem} from '../../types/post.types';

interface PostImageCarouselProps {
  media: MediaItem[];
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * Swipeable image carousel component for exactly 2 images
 * with memory management to prevent OOM crashes
 * Only handles images - videos should never be passed to this component
 */
export const PostImageCarousel = React.memo<PostImageCarouselProps>(
  ({media}) => {
    const {theme} = useTheme();
    const styles = createStyles(theme);

    // Validation: ensure only images are passed (videos should use PostVideo component)
    const hasVideos = media.some(item => item.type === 'video');
    if (hasVideos) {
      console.warn('PostImageCarousel received videos. Videos should use PostVideo component instead.');
    }
    const scrollX = useSharedValue(0);
    const scrollViewRef = useRef<Animated.ScrollView>(null);
    // Use shared values for worklet-accessible state
    const currentIndexShared = useSharedValue(0);
    const mediaLengthShared = useSharedValue(media.length);

    const {currentIndex, setCurrentIndex} = useMediaCarousel(media, 0);
    const {prefetchImage} = useImagePrefetch();

    // Update shared values when state changes (these can be accessed in worklets)
    useEffect(() => {
      currentIndexShared.value = currentIndex;
    }, [currentIndex, currentIndexShared]);

    useEffect(() => {
      mediaLengthShared.value = media.length;
    }, [media.length, mediaLengthShared]);

    // Prefetch next carousel item (only images) with thumbnails
    useEffect(() => {
      if (currentIndex < media.length - 1) {
        const nextItem = media[currentIndex + 1];
        if (nextItem && nextItem.type === 'image') {
          prefetchImage(nextItem.uri, nextItem.thumbnail);
        }
      }
    }, [currentIndex, media, prefetchImage]);

    const scrollHandler = useAnimatedScrollHandler({
      onScroll: event => {
        scrollX.value = event.contentOffset.x;
        const index = Math.round(event.contentOffset.x / SCREEN_WIDTH);
        // Use shared values instead of refs in worklet
        if (
          index >= 0 &&
          index < mediaLengthShared.value &&
          index !== currentIndexShared.value
        ) {
          runOnJS(setCurrentIndex)(index);
        }
      },
    });


    return (
      <View style={styles.container}>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}>
          {media.map((item) => {
            return (
              <View key={item.id} style={styles.imageContainer}>
                <ImageWithThumbnail
                  uri={item.uri}
                  thumbnailUri={item.thumbnail}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            );
          })}
        </Animated.ScrollView>
        {media.length > 1 && (
          <View style={styles.pagination}>
            {media.map((_, index) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const dotStyle = useAnimatedStyle(() => {
                const inputRange = [
                  (index - 1) * SCREEN_WIDTH,
                  index * SCREEN_WIDTH,
                  (index + 1) * SCREEN_WIDTH,
                ];
                const scale = interpolate(
                  scrollX.value,
                  inputRange,
                  [0.8, 1.2, 0.8],
                  Extrapolate.CLAMP,
                );
                const opacity = interpolate(
                  scrollX.value,
                  inputRange,
                  [0.5, 1, 0.5],
                  Extrapolate.CLAMP,
                );
                return {
                  transform: [{scale}],
                  opacity,
                };
              });

              return (
                <Animated.View
                  key={index}
                  style={[
                    styles.dot,
                    index === currentIndex && styles.dotActive,
                    dotStyle,
                  ]}
                />
              );
            })}
          </View>
        )}
      </View>
    );
  },
);

PostImageCarousel.displayName = 'PostImageCarousel';
