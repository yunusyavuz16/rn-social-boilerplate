import { Theme } from '@/styles/theme';
import { useTheme } from '@hooks/useTheme';
import { CachePriority, imageCacheService } from '@services/imageCacheService';
import React from 'react';
import { ActivityIndicator, StyleSheet, View, ViewStyle } from 'react-native';
import FastImage, { type ResizeMode } from 'react-native-fast-image';
import { useProgressiveImage } from './hooks/useProgressiveImage';
import { getCacheMode } from './utils/imageUtils';

interface ImageWithThumbnailProps {
  uri: string | number;
  thumbnailUri?: string | number;
  style?: ViewStyle;
  resizeMode?: ResizeMode;
  onLoad?: () => void;
  onError?: () => void;
}

export const ImageWithThumbnail: React.FC<ImageWithThumbnailProps> = ({
  uri,
  thumbnailUri,
  style,
  resizeMode = 'cover',
  onLoad,
  onError,
}) => {
  const { theme } = useTheme();
  const {
    imageUri,
    thumbnailUri: thumbUri,
    isFullImageLoaded,
    hasError,
    onLoad: handleFullImageLoad,
    onError: handleFullImageError,
  } = useProgressiveImage(uri, thumbnailUri);

  // Memoized callbacks to prevent unnecessary re-renders
  const handleImageLoad = () => {
    handleFullImageLoad();
    onLoad?.();
  };

  const handleImageError = () => {
    handleFullImageError();
    onError?.();
  };

  // Get optimized cache source for thumbnail
  const thumbnailSource = (() => {
    if (!thumbUri) return null;
    const cacheMode = getCacheMode(thumbUri);
    return imageCacheService.getCacheSource(thumbUri, cacheMode, CachePriority.HIGH);
  })();

  // Get optimized cache source for full image
  const fullImageSource = (() => {
    const cacheMode = getCacheMode(imageUri);
    return imageCacheService.getCacheSource(imageUri, cacheMode, CachePriority.NORMAL);
  })();

  // Show loading indicator only if no thumbnail is available and image is loading
  // Don't show if there's an error (error state will be shown instead)
  const shouldShowLoading = (() => {
    return thumbUri === null && !isFullImageLoaded && !hasError;
  })();

  const styles = createStyles(theme);

  return (
    <View style={[styles.container, style]} pointerEvents="none">
      {(!hasError || (hasError && thumbUri === null)) && (
        <View style={styles.fullImageLayer} pointerEvents="none">
          <FastImage
            source={fullImageSource}
            style={styles.imageLayer}
            resizeMode={resizeMode}
            onLoad={handleImageLoad}
            onError={handleImageError}
            pointerEvents="none"
          />
        </View>
      )}

      {thumbUri !== null && thumbnailSource !== null && !isFullImageLoaded && (
        <View style={styles.thumbnailLayer} pointerEvents="none">
          <FastImage
            source={thumbnailSource}
            style={styles.imageLayer}
            resizeMode={resizeMode}
            pointerEvents="none"
          />
        </View>
      )}

      {/* Loading indicator - only shown when no thumbnail is available */}
      {shouldShowLoading && (
        <View style={styles.loadingContainer} pointerEvents="none">
          <ActivityIndicator size="small" color={theme.colors.textSecondary} />
        </View>
      )}

      {/* Error state - shown only when both thumbnail and full image fail */}
      {hasError && thumbUri === null && <View style={styles.errorContainer} pointerEvents="none" />}
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      overflow: 'hidden',
      backgroundColor: 'transparent',
      // Ensure container takes up space immediately
      minHeight: 1,
      minWidth: 1,
    },
    imageLayer: {
      ...StyleSheet.absoluteFill,
    },
    thumbnailLayer: {
      ...StyleSheet.absoluteFill,
      zIndex: 2,
      // Ensure thumbnail layer covers entire area immediately
      backgroundColor: 'transparent',
    },
    fullImageLayer: {
      ...StyleSheet.absoluteFill,
      zIndex: 1,
      backgroundColor: 'transparent',
    },
    loadingContainer: {
      ...StyleSheet.absoluteFill,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      zIndex: 3,
    },
    errorContainer: {
      ...StyleSheet.absoluteFill,
      backgroundColor: theme.colors.border,
      zIndex: 1,
    },
  });

ImageWithThumbnail.displayName = 'ImageWithThumbnail';
