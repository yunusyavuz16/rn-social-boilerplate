import {useState, useCallback, useEffect} from 'react';

interface UseProgressiveImageReturn {
  imageUri: string | number;
  thumbnailUri: string | number | null;
  isLoading: boolean;
  hasError: boolean;
  onLoad: () => void;
  onError: () => void;
  onThumbnailLoad: () => void;
}

/**
 * Hook for progressive image loading
 * Manages thumbnail → full image loading strategy
 */
export const useProgressiveImage = (
  uri: string | number,
  thumbnailUri?: string | number,
): UseProgressiveImageReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [, setThumbnailLoaded] = useState(false);
  const [, setFullImageLoaded] = useState(false);

  const onThumbnailLoad = useCallback(() => {
    setThumbnailLoaded(true);
  }, []);

  const onLoad = useCallback(() => {
    setFullImageLoaded(true);
    setIsLoading(false);
    setHasError(false);
  }, []);

  const onError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  // Reset states when URI changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setThumbnailLoaded(false);
    setFullImageLoaded(false);
  }, [uri]);

  return {
    imageUri: uri,
    thumbnailUri: thumbnailUri || null,
    isLoading,
    hasError,
    onLoad,
    onError,
    onThumbnailLoad,
  };
};

