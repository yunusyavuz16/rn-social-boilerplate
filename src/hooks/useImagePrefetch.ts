import {useCallback, useRef} from 'react';
import FastImage from 'react-native-fast-image';

interface UseImagePrefetchReturn {
  prefetchImage: (uri: string | number) => void;
  prefetchImages: (uris: (string | number)[]) => void;
}

/**
 * Hook for image prefetching
 * Preloads images before they're needed for smoother UX
 */
export const useImagePrefetch = (): UseImagePrefetchReturn => {
  const prefetchedRef = useRef<Set<string>>(new Set());

  const getImageUri = useCallback((uri: string | number): string => {
    if (typeof uri === 'string') {
      return uri;
    }
    // For require() imports, we can't prefetch them
    return '';
  }, []);

  const prefetchImage = useCallback(
    (uri: string | number) => {
      const imageUri = getImageUri(uri);
      if (!imageUri || prefetchedRef.current.has(imageUri)) {
        return;
      }

      try {
        FastImage.preload([{uri: imageUri}]);
        prefetchedRef.current.add(imageUri);
      } catch (error) {
        console.warn('Error prefetching image:', error);
      }
    },
    [getImageUri],
  );

  const prefetchImages = useCallback(
    (uris: (string | number)[]) => {
      const imageUris = uris
        .map(getImageUri)
        .filter((uri): uri is string => Boolean(uri) && !prefetchedRef.current.has(uri));

      if (imageUris.length === 0) {
        return;
      }

      try {
        FastImage.preload(imageUris.map(uri => ({uri})));
        imageUris.forEach(uri => prefetchedRef.current.add(uri));
      } catch (error) {
        console.warn('Error prefetching images:', error);
      }
    },
    [getImageUri],
  );

  return {
    prefetchImage,
    prefetchImages,
  };
};

