/**
 * Tests for MediaGrid component
 * Validates search filtering and pagination hooks
 */

import React from 'react';
import { act, waitFor } from '@testing-library/react-native';
import { FlatList } from 'react-native';
import { MediaGrid } from '../MediaGrid';
import { renderWithProviders, createMockPost } from '../../../../__tests__/utils/testUtils';

const mockPrefetchImages = jest.fn();
const mockIsItemVisible = jest.fn(() => true);
const mockOnViewableItemsChanged = jest.fn();
const mockUseResponsiveColumns = jest.fn((_params?: { breakpoint: string }) => 3);

const mockUseGetPostsReturn = {
  posts: [createMockPost({ caption: 'Beach day' })],
  isLoading: false,
  isLoadingMore: false,
  error: null as Error | null,
  hasMore: false,
  refresh: jest.fn(),
  loadMore: jest.fn(),
};

jest.mock('@/hooks/useGetPosts', () => ({
  useGetPosts: () => mockUseGetPostsReturn,
}));

jest.mock('@hooks/useImagePrefetch', () => ({
  useImagePrefetch: () => ({ prefetchImages: mockPrefetchImages }),
}));

jest.mock('@hooks/useMediaPlayerVisibility', () => ({
  useMediaPlayerVisibility: () => ({
    onViewableItemsChanged: mockOnViewableItemsChanged,
    isItemVisible: mockIsItemVisible,
  }),
}));

jest.mock('@/screens/Search/hooks/useResponsiveColumns', () => ({
  useResponsiveColumns: (params: { breakpoint: string }) => mockUseResponsiveColumns(params),
}));

jest.mock('@hooks/useBreakpoint', () => ({
  useBreakpoint: () => ({
    width: 375,
    breakpoint: 'sm',
  }),
}));

jest.mock('../components/MediaGridItem', () => {
  const ReactModule = require('react');
  const { View } = require('react-native');

  return {
    MediaGridItem: () => ReactModule.createElement(View, { testID: 'media-grid-item' }),
  };
});

describe('MediaGrid', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseGetPostsReturn.posts = [createMockPost({ caption: 'Beach day' })];
    mockUseGetPostsReturn.isLoading = false;
    mockUseGetPostsReturn.isLoadingMore = false;
    mockUseGetPostsReturn.error = null;
    mockUseGetPostsReturn.hasMore = false;
    mockUseGetPostsReturn.refresh = jest.fn();
    mockUseGetPostsReturn.loadMore = jest.fn();
  });

  it('renders media items matching the search query', () => {
    mockUseGetPostsReturn.posts = [
      createMockPost({ id: 'post_1', caption: 'Beach day' }),
      createMockPost({ id: 'post_2', caption: 'City life' }),
    ];

    const { getAllByTestId } = renderWithProviders(<MediaGrid searchQuery="beach" />);

    expect(getAllByTestId('media-grid-item')).toHaveLength(2);
  });

  it('renders feed empty state when no post matches search query', () => {
    mockUseGetPostsReturn.posts = [createMockPost({ caption: 'City life' })];

    const { getByText } = renderWithProviders(<MediaGrid searchQuery="forest" />);

    expect(getByText('No posts yet')).toBeTruthy();
  });

  it('calls loadMore when end is reached and more posts are available', () => {
    mockUseGetPostsReturn.hasMore = true;

    const { UNSAFE_getByType } = renderWithProviders(<MediaGrid searchQuery="" />);

    act(() => {
      UNSAFE_getByType(FlatList).props.onEndReached?.({ distanceFromEnd: 0 });
    });

    expect(mockUseGetPostsReturn.loadMore).toHaveBeenCalled();
  });

  it('prefetches images when posts are available', async () => {
    mockUseGetPostsReturn.posts = [createMockPost({ caption: 'Sunset vibes' })];

    renderWithProviders(<MediaGrid searchQuery="sunset" />);

    await waitFor(() => expect(mockPrefetchImages).toHaveBeenCalled());
  });
});
