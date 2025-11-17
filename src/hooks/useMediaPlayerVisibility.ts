import { useState } from 'react';
import type { ViewToken } from 'react-native';

interface UseMediaPlayerVisibilityReturn {
  visibleItems: Set<number>;
  onViewableItemsChanged: (info: { viewableItems: ViewToken[] }) => void;
  isItemVisible: (index: number) => boolean;
}


export const useMediaPlayerVisibility = (
  _itemVisiblePercentThreshold: number = 50,
): UseMediaPlayerVisibilityReturn => {
  // Initialize with first few items visible to prevent black screen on mount
  // This ensures videos autoplay immediately when feed loads
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set([0, 1]));

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    const newVisibleItems = new Set<number>();
    for (const item of viewableItems) {
      if (item.index !== null && item.isViewable) {
        newVisibleItems.add(item.index);
      }
    }
    setVisibleItems(newVisibleItems);
  };

  const isItemVisible = (index: number): boolean => {
    return visibleItems.has(index);
  };

  return {
    visibleItems,
    onViewableItemsChanged,
    isItemVisible,
  };
};
