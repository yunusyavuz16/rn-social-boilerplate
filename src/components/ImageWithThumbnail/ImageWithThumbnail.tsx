import React, {useMemo} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import FastImage, {type ResizeMode} from 'react-native-fast-image';
import {useProgressiveImage} from '@hooks/useProgressiveImage';
import {imageCacheService, CachePriority} from '@services/imageCacheService';
import {useTheme} from '@hooks/useTheme';

interface ImageWithThumbnailProps {
  uri: string | number;
  thumbnailUri?: string | number;
  style?: any;
  resizeMode?: ResizeMode;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Progressive image loading component
 * Shows thumbnail first, then loads full image
 * Provides smooth transition from placeholder → thumbnail → full image
 */
export const ImageWithThumbnail = React.memo<ImageWithThumbnailProps>(
  ({
    uri,
    thumbnailUri,
    style,
    resizeMode = 'cover' as ResizeMode,
    onLoad,
    onError,
  }) => {
    const {theme} = useTheme();
    const {
      imageUri,
      thumbnailUri: thumbUri,
      isLoading,
      hasError,
      onLoad: handleLoad,
      onError: handleError,
      onThumbnailLoad,
    } = useProgressiveImage(uri, thumbnailUri);

    const handleImageLoad = () => {
      handleLoad();
      onLoad?.();
    };

    const handleImageError = () => {
      handleError();
      onError?.();
    };

    // Get optimized cache source for thumbnail
    const thumbnailSource = useMemo(() => {
      if (!thumbUri) return null;
      return imageCacheService.getCacheSource(thumbUri, 'immutable', CachePriority.HIGH);
    }, [thumbUri]);

    // Get optimized cache source for full image
    const fullImageSource = useMemo(() => {
      return imageCacheService.getCacheSource(imageUri, 'immutable', CachePriority.NORMAL);
    }, [imageUri]);

    const styles = useMemo(
      () =>
        StyleSheet.create({
          container: {
            overflow: 'hidden',
          },
          loadingContainer: {
            ...StyleSheet.absoluteFill,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            zIndex: 2,
          },
          errorContainer: {
            backgroundColor: theme.colors.border,
          },
        }),
      [theme.colors.border],
    );

    return (
      <View style={[styles.container, style]} pointerEvents="none">
        {/* Full image layer - always rendered so it can load */}
        {!hasError ? (
          <>
            {/* Only show loading indicator if no thumbnail is available */}
            {isLoading && !thumbUri && (
              <View style={styles.loadingContainer} pointerEvents="none">
                <ActivityIndicator size="small" color={theme.colors.white} />
              </View>
            )}
            <View style={StyleSheet.absoluteFill} pointerEvents="none">
              <FastImage
                source={fullImageSource}
                style={StyleSheet.absoluteFill}
                resizeMode={resizeMode}
                onLoad={handleImageLoad}
                onError={handleImageError}
                pointerEvents="none"
              />
            </View>
          </>
        ) : (
          <View style={[StyleSheet.absoluteFill, styles.errorContainer]} pointerEvents="none" />
        )}

        {/* Thumbnail layer - visible while loading at full opacity, hidden when full image loads */}
        {thumbUri && !hasError && thumbnailSource && isLoading && (
          <View style={StyleSheet.absoluteFill} pointerEvents="none">
            <FastImage
              source={thumbnailSource}
              style={StyleSheet.absoluteFill}
              resizeMode={resizeMode}
              onLoad={onThumbnailLoad}
              pointerEvents="none"
            />
          </View>
        )}
      </View>
    );
  },
);

ImageWithThumbnail.displayName = 'ImageWithThumbnail';

