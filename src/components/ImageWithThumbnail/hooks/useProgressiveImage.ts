import { useEffect, useRef, useState } from 'react';

interface UseProgressiveImageReturn {
  imageUri: string | number;
  thumbnailUri: string | number | null;
  isFullImageLoaded: boolean;
  hasError: boolean;
  onLoad: () => void;
  onError: () => void;
}

/**
 * Hook for progressive image loading
 * Manages thumbnail → full image loading strategy
 * Tracks thumbnail and full image load states separately for optimal rendering
 */
export const useProgressiveImage = (
  uri: string | number,
  thumbnailUri?: string | number,
): UseProgressiveImageReturn => {
  const [isFullImageLoaded, setIsFullImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const previousUriRef = useRef<string | number>(uri);
  const previousThumbnailUriRef = useRef<string | number | undefined>(thumbnailUri);

  // Reset states when URI or thumbnail URI changes
  useEffect(() => {
    const uriChanged = previousUriRef.current !== uri;
    const thumbnailChanged = previousThumbnailUriRef.current !== thumbnailUri;

    if (uriChanged || thumbnailChanged) {
      setIsFullImageLoaded(false);
      setHasError(false);
      previousUriRef.current = uri;
      previousThumbnailUriRef.current = thumbnailUri;
    }
  }, [uri, thumbnailUri]);

  const onLoad = () => {
    setIsFullImageLoaded(true);
    setHasError(false);
  };

  const onError = () => {
    setHasError(true);
  };

  return {
    imageUri: uri,
    thumbnailUri: thumbnailUri || null,
    isFullImageLoaded,
    hasError,
    onLoad,
    onError,
  };
};

