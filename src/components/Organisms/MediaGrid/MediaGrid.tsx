import { ThemedText } from '@/components/Atoms/ThemedText/ThemedText';
import { ThemedView } from '@/components/Atoms/ThemedView/ThemedView';
import { EmptyState } from '@/components/Molecules/EmptyState/EmptyState';
import { PostSkeleton } from '@/components/Molecules/Skeleton/Skeleton';
import { useGetPosts } from '@/hooks/useGetPosts';
import { useResponsiveColumns } from '@/screens/Search/hooks/useResponsiveColumns';
import { MediaItem } from '@/types/post.types';
import { useBreakpoint } from '@hooks/useBreakpoint';
import { useImagePrefetch } from '@hooks/useImagePrefetch';
import { useMediaPlayerVisibility } from '@hooks/useMediaPlayerVisibility';
import { useTheme } from '@hooks/useTheme';
import React, { useEffect, useMemo, useRef } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';
import { createStyles } from './MediaGrid.styles';
import { MediaGridItem } from './components/MediaGridItem';

export const MediaGrid: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const { width: SCREEN_WIDTH } = useBreakpoint();
  const { theme } = useTheme();
  const { breakpoint } = useBreakpoint();
  const styles = createStyles(theme, breakpoint);

  const { posts, isLoading, isLoadingMore, error, hasMore, refresh, loadMore } = useGetPosts();
  const { prefetchImages } = useImagePrefetch();
  const { onViewableItemsChanged, isItemVisible } = useMediaPlayerVisibility(50);

  const numColumns = useResponsiveColumns({ breakpoint });

  const viewabilityConfigRef = useRef({
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 200,
  });

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: viewabilityConfigRef.current,
      onViewableItemsChanged,
    },
  ]);

  const handleEndReached = () => {
    if (hasMore && !isLoadingMore) {
      loadMore();
    }
  };

  // Prefetch next posts' media when scrolling (with thumbnails)
  useEffect(() => {
    if (posts.length > 0) {
      const mediaItems = posts.flatMap(post =>
        post.media
          .filter(m => m.type === 'image')
          .map(m => ({ uri: m.uri, thumbnailUri: m.thumbnail })),
      );
      if (mediaItems.length > 0) {
        prefetchImages(mediaItems);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);

  const renderFooter = () => {
    if (!hasMore && posts.length > 0) {
      return (
        <ThemedView style={styles.endMessage}>
          <ThemedText style={styles.endMessageText}>No more posts</ThemedText>
        </ThemedView>
      );
    }

    if (!isLoadingMore) {
      return null;
    }

    return (
      <ThemedView style={styles.footerLoader}>
        <ActivityIndicator size="small" color={theme.colors.primary} />
      </ThemedView>
    );
  };

  const renderEmpty = () => {
    // Show loading skeleton during initial load
    if (isLoading) {
      const skeletonItems = Array.from({ length: 3 }, (_, i) => ({
        id: `skeleton-${i}`,
      }));
      return (
        <ThemedView style={styles.emptyContainer}>
          {skeletonItems.map(item => (
            <PostSkeleton key={item.id} />
          ))}
        </ThemedView>
      );
    }
    if (error) {
      return <EmptyState type="network" message={error.message} onRetry={refresh} />;
    }
    // Only show "no posts yet" when loading is complete and there are no posts
    return <EmptyState type="feed" />;
  };

  const { itemWidth } = (() => {
    const width = SCREEN_WIDTH / numColumns;
    return { itemWidth: width };
  })();

  const keyExtractor = (item: MediaItem) => item.id;

  const renderItem = ({ item, index }: { item: MediaItem; index: number }) => {
    const isVisible = isItemVisible(index);
    return (
      <View style={[styles.gridItem, { width: itemWidth }]}>
        <MediaGridItem
          id={item.id}
          type={item.type}
          uri={item.uri}
          thumbnail={item.thumbnail}
          duration={item.duration}
          isVisible={isVisible}
        />
      </View>
    );
  };

  // Extract media from posts and create mapping
  const media = useMemo(() => {
    const mediaItems: MediaItem[] = [];
    const filteredPosts = posts.filter(p =>
      p.caption.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    for (const post of filteredPosts) {
      for (const mediaItem of post.media) {
        mediaItems.push(mediaItem);
      }
    }

    return mediaItems
  }, [posts, searchQuery]);

  return (
    <View style={styles.container}>
      <FlatList
        data={media}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        style={styles.grid}
        removeClippedSubviews
        maxToRenderPerBatch={3}
        windowSize={5}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.8}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh} />}
        // Memory optimization: track visible items to pause off-screen videos
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        initialNumToRender={2}
        updateCellsBatchingPeriod={100}
      />
    </View>
  );
};

MediaGrid.displayName = 'MediaGrid';
