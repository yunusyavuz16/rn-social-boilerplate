import {useState, useCallback} from 'react';
import type {ViewToken} from 'react-native';

interface UseMediaPlayerVisibilityReturn {
  visibleItems: Set<number>;
  onViewableItemsChanged: (info: {viewableItems: ViewToken[]}) => void;
  isItemVisible: (index: number) => boolean;
}

/**
 * Hook for tracking visible media items in a grid/list
 * Optimizes video autoplay by only playing visible items
 * Uses intersection observer pattern for memory efficiency
 */
export const useMediaPlayerVisibility = (
  _itemVisiblePercentThreshold: number = 50,
): UseMediaPlayerVisibilityReturn => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      const newVisibleItems = new Set<number>();
      viewableItems.forEach((item) => {
        if (item.index !== null && item.isViewable) {
          newVisibleItems.add(item.index);
        }
      });
      setVisibleItems(newVisibleItems);
    },
    [],
  );

  const isItemVisible = useCallback(
    (index: number): boolean => {
      return visibleItems.has(index);
    },
    [visibleItems],
  );

  return {
    visibleItems,
    onViewableItemsChanged,
    isItemVisible,
  };
};

