import {useState, useCallback, useEffect} from 'react';
import {useGetPostsQuery, useToggleLikeMutation} from '@store/api/postsApi';
import type {Post} from '../types/post.types';

interface UseFeedRTKReturn {
  posts: Post[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: Error | null;
  hasMore: boolean;
  refresh: () => void;
  loadMore: () => void;
  toggleLike: (postId: string) => void;
}

/**
 * Hook for managing feed posts with RTK Query
 * Handles pagination and optimistic updates
 */
export const useFeedRTK = (): UseFeedRTKReturn => {
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  const {
    data: currentPageData,
    isLoading,
    isFetching,
    error: queryError,
    refetch,
  } = useGetPostsQuery({page, limit: 10}, {skip: false});

  const [toggleLikeMutation] = useToggleLikeMutation();

  // Update allPosts when new data arrives
  useEffect(() => {
    if (currentPageData) {
      if (page === 1) {
        // Reset posts for first page
        setAllPosts(currentPageData.posts);
      } else {
        // Append new posts, filtering out duplicates by ID
        setAllPosts(prev => {
          const existingIds = new Set(prev.map(post => post.id));
          const newPosts = currentPageData.posts.filter(
            post => !existingIds.has(post.id),
          );
          return [...prev, ...newPosts];
        });
      }
    }
  }, [currentPageData, page]);

  const refresh = useCallback(() => {
    setPage(1);
    setAllPosts([]);
    refetch();
  }, [refetch]);

  const loadMore = useCallback(() => {
    if (currentPageData?.hasMore && !isFetching) {
      setPage(prev => prev + 1);
    }
  }, [currentPageData?.hasMore, isFetching]);

  const toggleLike = useCallback(
    (postId: string) => {
      // Optimistic update
      setAllPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? {
                ...post,
                isLiked: !post.isLiked,
                likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              }
            : post,
        ),
      );

      // Call mutation (for future API integration)
      toggleLikeMutation({postId}).catch(() => {
        // Rollback on error
        setAllPosts(prevPosts =>
          prevPosts.map(post =>
            post.id === postId
              ? {
                  ...post,
                  isLiked: !post.isLiked,
                  likes: post.isLiked ? post.likes + 1 : post.likes - 1,
                }
              : post,
          ),
        );
      });
    },
    [toggleLikeMutation],
  );

  return {
    posts: allPosts,
    isLoading: isLoading && page === 1,
    isLoadingMore: isFetching && page > 1,
    error: queryError
      ? new Error(
          typeof queryError === 'string'
            ? queryError
            : 'error' in queryError
              ? String(queryError.error)
              : 'Failed to fetch posts',
        )
      : null,
    hasMore: currentPageData?.hasMore ?? false,
    refresh,
    loadMore,
    toggleLike,
  };
};

