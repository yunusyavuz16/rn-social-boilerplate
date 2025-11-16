import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import FastImage, {type ResizeMode} from 'react-native-fast-image';
import {useProgressiveImage} from '@hooks/useProgressiveImage';
import {theme} from '@styles/theme';

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

    return (
      <View style={[styles.container, style]}>
        {/* Thumbnail layer (blurred/low quality) */}
        {thumbUri && !hasError && (
          <FastImage
            source={typeof thumbUri === 'string' ? {uri: thumbUri} : thumbUri}
            style={[StyleSheet.absoluteFill, styles.thumbnail]}
            resizeMode={resizeMode}
            onLoad={onThumbnailLoad}
          />
        )}

        {/* Full image layer */}
        {!hasError ? (
          <>
            {isLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={theme.colors.white} />
              </View>
            )}
            <FastImage
              source={typeof imageUri === 'string' ? {uri: imageUri} : imageUri}
              style={StyleSheet.absoluteFill}
              resizeMode={resizeMode}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </>
        ) : (
          <View style={[StyleSheet.absoluteFill, styles.errorContainer]} />
        )}
      </View>
    );
  },
);

ImageWithThumbnail.displayName = 'ImageWithThumbnail';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  thumbnail: {
    opacity: 0.5,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    zIndex: 1,
  },
  errorContainer: {
    backgroundColor: theme.colors.border,
  },
});

