import {useState, useCallback} from 'react';
import type {MediaItem} from '../types/post.types';

interface UseMediaCarouselReturn {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  goToIndex: (index: number) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

/**
 * Hook for managing carousel state and navigation
 * Provides index tracking and navigation methods
 */
export const useMediaCarousel = (
  media: MediaItem[],
  initialIndex: number = 0,
): UseMediaCarouselReturn => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const mediaLength = media.length;

  const goToIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index < mediaLength) {
        setCurrentIndex(index);
      }
    },
    [mediaLength],
  );

  const goToNext = useCallback(() => {
    if (currentIndex < mediaLength - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, mediaLength]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const canGoNext = currentIndex < mediaLength - 1;
  const canGoPrevious = currentIndex > 0;

  return {
    currentIndex,
    setCurrentIndex,
    goToIndex,
    goToNext,
    goToPrevious,
    canGoNext,
    canGoPrevious,
  };
};

