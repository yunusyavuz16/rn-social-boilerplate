import React, {useCallback, useRef, useEffect, useMemo} from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import {MediaGridItem} from './MediaGridItem';
import {useMediaPlayerVisibility} from '@hooks/useMediaPlayerVisibility';
import {useBreakpoint} from '@hooks/useBreakpoint';
import {useImagePrefetch} from '@hooks/useImagePrefetch';
import {styles} from './MediaGrid.styles';
import type {MediaItem} from '../../types/post.types';

interface MediaGridProps {
  data: MediaItem[];
  numColumns?: number;
  onItemPress?: (item: MediaItem) => void;
  pauseVideos?: boolean;
}

const {width: SCREEN_WIDTH} = Dimensions.get('window');

/**
 * Media grid component displaying images and videos in a grid layout
 * Videos auto-play when visible
 */
export const MediaGrid = React.memo<MediaGridProps>(
  ({data, numColumns: propNumColumns, onItemPress, pauseVideos = false}) => {
    const {breakpoint} = useBreakpoint();
    const {visibleItems, onViewableItemsChanged, isItemVisible} = useMediaPlayerVisibility(50);
    const {prefetchImages} = useImagePrefetch();
    const viewabilityConfig = useRef({
      itemVisiblePercentThreshold: 50,
    });

    // Calculate responsive numColumns based on breakpoint
    const numColumns = useMemo(() => {
      if (propNumColumns) {
        return propNumColumns;
      }
      if (breakpoint === 'xl' || breakpoint === 'lg') {
        return 5;
      }
      if (breakpoint === 'md') {
        return 4;
      }
      return 3;
    }, [propNumColumns, breakpoint]);

    // Prefetch visible items
    useEffect(() => {
      if (data.length > 0 && visibleItems.size > 0) {
        const visibleIndices = Array.from(visibleItems).slice(0, 12);
        const imageUris = visibleIndices
          .map(index => data[index])
          .filter(item => item && item.type === 'image')
          .map(item => item.uri);
        if (imageUris.length > 0) {
          prefetchImages(imageUris);
        }
      }
    }, [data, visibleItems, prefetchImages]);

    const renderItem = useCallback(
      ({item, index}: {item: MediaItem; index: number}) => {
        const isVisible = pauseVideos ? false : isItemVisible(index);
        const handlePress = () => {
          onItemPress?.(item);
        };
        return (
          <View style={[styles.gridItem, {width: SCREEN_WIDTH / numColumns}]}>
            <MediaGridItem
              item={item}
              index={index}
              isVisible={isVisible}
              onPress={handlePress}
            />
          </View>
        );
      },
      [isItemVisible, numColumns, pauseVideos, onItemPress],
    );

    const keyExtractor = useCallback((item: MediaItem) => item.id, []);

    const itemSize = SCREEN_WIDTH / numColumns;
    const getItemLayout = useCallback(
      (_: unknown, index: number) => {
        const row = Math.floor(index / numColumns);
        return {
          length: itemSize,
          offset: row * itemSize * numColumns,
          index,
        };
      },
      [numColumns, itemSize],
    );

    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={numColumns}
          style={styles.grid}
          removeClippedSubviews
          maxToRenderPerBatch={10}
          windowSize={5}
          initialNumToRender={6}
          getItemLayout={getItemLayout}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig.current}
        />
      </View>
    );
  },
);

MediaGrid.displayName = 'MediaGrid';

