import FastImage, {Priority} from 'react-native-fast-image';


export type CacheMode = 'immutable' | 'web' | 'cacheOnly';

export enum CachePriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
}


class ImageCacheService {
  private readonly prefetchedImages = new Set<string>();
  private readonly prefetchedThumbnails = new Set<string>();

  private getCachePriority(priority: CachePriority = CachePriority.NORMAL): Priority {
    switch (priority) {
      case CachePriority.LOW:
        return FastImage.priority.low;
      case CachePriority.HIGH:
        return FastImage.priority.high;
      default:
        return FastImage.priority.normal;
    }
  }

  prefetchImage(
    uri: string | number,
    thumbnailUri?: string | number,
    priority: CachePriority = CachePriority.NORMAL,
  ): void {
    // Prefetch thumbnail first (smaller, faster)
    if (thumbnailUri && typeof thumbnailUri === 'string') {
      const thumbKey = thumbnailUri;
      if (!this.prefetchedThumbnails.has(thumbKey)) {
        try {
          FastImage.preload([
            {
              uri: thumbKey,
              priority: this.getCachePriority(priority),
            },
          ]);
          this.prefetchedThumbnails.add(thumbKey);
        } catch (error) {
          console.warn('Error prefetching thumbnail:', error);
        }
      }
    }

    if (typeof uri === 'string') {
      const imageKey = uri;
      if (!this.prefetchedImages.has(imageKey)) {
        try {
          FastImage.preload([
            {
              uri: imageKey,
              priority: this.getCachePriority(priority),
            },
          ]);
          this.prefetchedImages.add(imageKey);
        } catch (error) {
          console.warn('Error prefetching image:', error);
        }
      }
    }
  }


  prefetchImages(
    items: Array<{uri: string | number; thumbnailUri?: string | number}>,
    priority: CachePriority = CachePriority.NORMAL,
  ): void {
    const thumbnailsToPrefetch: string[] = [];
    const imagesToPrefetch: string[] = [];

    items.forEach(({uri, thumbnailUri}) => {
      // Collect thumbnails
      if (thumbnailUri && typeof thumbnailUri === 'string') {
        const thumbKey = thumbnailUri;
        if (!this.prefetchedThumbnails.has(thumbKey)) {
          thumbnailsToPrefetch.push(thumbKey);
          this.prefetchedThumbnails.add(thumbKey);
        }
      }

      // Collect full images
      if (typeof uri === 'string') {
        const imageKey = uri;
        if (!this.prefetchedImages.has(imageKey)) {
          imagesToPrefetch.push(imageKey);
          this.prefetchedImages.add(imageKey);
        }
      }
    });

    // Prefetch thumbnails first (smaller files)
    if (thumbnailsToPrefetch.length > 0) {
      try {
        FastImage.preload(
          thumbnailsToPrefetch.map(uri => ({
            uri,
            priority: this.getCachePriority(priority),
          })),
        );
      } catch (error) {
        console.warn('Error prefetching thumbnails:', error);
      }
    }

    // Prefetch full images
    if (imagesToPrefetch.length > 0) {
      try {
        FastImage.preload(
          imagesToPrefetch.map(uri => ({
            uri,
            priority: this.getCachePriority(priority),
          })),
        );
      } catch (error) {
        console.warn('Error prefetching images:', error);
      }
    }
  }

  /**
   * Check if an image is already prefetched
   */
  isPrefetched(uri: string | number): boolean {
    if (typeof uri === 'string') {
      return this.prefetchedImages.has(uri);
    }
    return false;
  }

  /**
   * Check if a thumbnail is already prefetched
   */
  isThumbnailPrefetched(thumbnailUri: string | number): boolean {
    if (typeof thumbnailUri === 'string') {
      return this.prefetchedThumbnails.has(thumbnailUri);
    }
    return false;
  }

  /**
   * Clear prefetch tracking (does not clear FastImage cache)
   */
  clearPrefetchTracking(): void {
    this.prefetchedImages.clear();
    this.prefetchedThumbnails.clear();
  }

  /**
   * Clear FastImage disk cache
   * Note: This is an async operation
   */
  async clearDiskCache(): Promise<void> {
    try {
      await FastImage.clearDiskCache();
    } catch (error) {
      console.warn('Error clearing disk cache:', error);
    }
  }

  /**
   * Clear FastImage memory cache
   */
  clearMemoryCache(): void {
    try {
      FastImage.clearMemoryCache();
    } catch (error) {
      console.warn('Error clearing memory cache:', error);
    }
  }

  /**
   * Clear all caches (memory + disk + tracking)
   */
  async clearAllCaches(): Promise<void> {
    this.clearMemoryCache();
    await this.clearDiskCache();
    this.clearPrefetchTracking();
  }

  /**
   * Get cache source configuration for FastImage
   * @param uri - Image URI
   * @param cacheMode - Cache mode (default: immutable for local assets, web for URLs)
   * @param priority - Cache priority
   */
  getCacheSource(
    uri: string | number,
    cacheMode?: CacheMode,
    priority: CachePriority = CachePriority.NORMAL,
  ): {uri: string; cache?: CacheMode; priority?: Priority} | number {
    // Local require() assets don't need cache configuration
    if (typeof uri === 'number') {
      return uri;
    }

    // Determine cache mode if not provided
    const mode: CacheMode = cacheMode || 'immutable';

    return {
      uri,
      cache: mode,
      priority: this.getCachePriority(priority),
    };
  }
}

export const imageCacheService = new ImageCacheService();

