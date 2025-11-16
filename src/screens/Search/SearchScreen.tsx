import React, {useState, useCallback, useEffect, useMemo, useRef} from 'react';
import {TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from '@hooks/useTheme';
import {ThemedView} from '@components/ThemedView/ThemedView';
import {SearchBar} from '@components/SearchBar/SearchBar';
import {MediaGrid} from '@components/MediaGrid/MediaGrid';
import {EmptyState} from '@components/EmptyState/EmptyState';
import {BackButton} from '@components/BackButton/BackButton';
import {useSearchRTK} from '@hooks/useSearchRTK';
import {useBreakpoint} from '@hooks/useBreakpoint';
import {useImagePrefetch} from '@hooks/useImagePrefetch';
import {GridSkeleton} from '@components/Skeleton/Skeleton';
import type {RootStackParamList} from '../../navigation/types';
import type {MediaItem} from '../../types/post.types';
import {createStyles} from './SearchScreen.styles';

/**
 * Search screen displaying media in a grid layout
 * Videos are paused in search grid
 * Searches posts by caption
 * Tapping a media item navigates to post detail screen
 */
export const SearchScreen: React.FC = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {media, mediaToPostMap, isLoading, error, search, clearSearch, hasInitialContent} = useSearchRTK();
  const {breakpoint} = useBreakpoint();
  const {prefetchImages} = useImagePrefetch();
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<TextInput>(null);

  // Calculate responsive numColumns based on breakpoint
  const numColumns = useMemo(() => {
    if (breakpoint === 'xl' || breakpoint === 'lg') {
      return 5;
    }
    if (breakpoint === 'md') {
      return 4;
    }
    return 3;
  }, [breakpoint]);

  const handleSearchChange = useCallback(
    (text: string) => {
      setSearchQuery(text);
      if (text.trim()) {
        search(text.trim());
      } else {
        clearSearch();
      }
    },
    [search, clearSearch],
  );

  // Prefetch visible media items
  useEffect(() => {
    if (media.length > 0) {
      const visibleItems = media.slice(0, 12); // First 12 items
      const imageUris = visibleItems
        .filter(item => item.type === 'image')
        .map(item => item.uri);
      if (imageUris.length > 0) {
        prefetchImages(imageUris);
      }
    }
  }, [media, prefetchImages]);

  // Auto-focus search input when screen is focused
  useFocusEffect(
    useCallback(() => {
      // Small delay to ensure the screen is fully mounted
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }, []),
  );

  const handleItemPress = useCallback(
    (item: MediaItem) => {
      const post = mediaToPostMap.get(item.id);
      if (post) {
        navigation.navigate('PostDetail', {post});
      }
    },
    [navigation, mediaToPostMap],
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ThemedView style={styles.header}>
        <BackButton />
        <ThemedView style={styles.searchBarContainer}>
          <SearchBar
            ref={searchInputRef}
            value={searchQuery}
            onChangeText={handleSearchChange}
            placeholder="Search..."
          />
        </ThemedView>
      </ThemedView>
      {isLoading ? (
        <GridSkeleton numColumns={numColumns} />
      ) : error ? (
        <EmptyState
          type="network"
          message={error.message}
          onRetry={() => searchQuery.trim() && search(searchQuery.trim())}
        />
      ) : media.length === 0 && searchQuery.trim() ? (
        <EmptyState type="search" />
      ) : media.length === 0 && !hasInitialContent ? (
        <GridSkeleton numColumns={numColumns} />
      ) : (
        <MediaGrid
          data={media}
          numColumns={numColumns}
          onItemPress={handleItemPress}
          pauseVideos={true}
        />
      )}
    </SafeAreaView>
  );
};

