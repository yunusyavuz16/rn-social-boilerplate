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

  private collectThumbnailsToPrefetch(
    items: Array<{uri: string | number; thumbnailUri?: string | number}>,
  ): string[] {
    const thumbnailsToPrefetch: string[] = [];
    for (const {thumbnailUri} of items) {
      if (thumbnailUri && typeof thumbnailUri === 'string') {
        if (!this.prefetchedThumbnails.has(thumbnailUri)) {
          thumbnailsToPrefetch.push(thumbnailUri);
          this.prefetchedThumbnails.add(thumbnailUri);
        }
      }
    }
    return thumbnailsToPrefetch;
  }

  private collectImagesToPrefetch(
    items: Array<{uri: string | number; thumbnailUri?: string | number}>,
  ): string[] {
    const imagesToPrefetch: string[] = [];
    for (const {uri} of items) {
      if (typeof uri === 'string') {
        if (!this.prefetchedImages.has(uri)) {
          imagesToPrefetch.push(uri);
          this.prefetchedImages.add(uri);
        }
      }
    }
    return imagesToPrefetch;
  }

  private preloadImages(uris: string[], priority: CachePriority): void {
    if (uris.length === 0) {
      return;
    }
    try {
      FastImage.preload(
        uris.map(uri => ({
          uri,
          priority: this.getCachePriority(priority),
        })),
      );
    } catch (error) {
      console.warn('Error prefetching images:', error);
    }
  }

  prefetchImages(
    items: Array<{uri: string | number; thumbnailUri?: string | number}>,
    priority: CachePriority = CachePriority.NORMAL,
  ): void {
    const thumbnailsToPrefetch = this.collectThumbnailsToPrefetch(items);
    const imagesToPrefetch = this.collectImagesToPrefetch(items);

    // Prefetch thumbnails first (smaller files)
    this.preloadImages(thumbnailsToPrefetch, priority);

    // Prefetch full images
    this.preloadImages(imagesToPrefetch, priority);
  }

  isPrefetched(uri: string | number): boolean {
    if (typeof uri === 'string') {
      return this.prefetchedImages.has(uri);
    }
    return false;
  }

  isThumbnailPrefetched(thumbnailUri: string | number): boolean {
    if (typeof thumbnailUri === 'string') {
      return this.prefetchedThumbnails.has(thumbnailUri);
    }
    return false;
  }

  clearPrefetchTracking(): void {
    this.prefetchedImages.clear();
    this.prefetchedThumbnails.clear();
  }

  async clearDiskCache(): Promise<void> {
    try {
      await FastImage.clearDiskCache();
    } catch (error) {
      console.warn('Error clearing disk cache:', error);
    }
  }

  clearMemoryCache(): void {
    FastImage.clearMemoryCache().catch(error => {
      console.warn('Error clearing memory cache:', error);
    });
  }

  async clearAllCaches(): Promise<void> {
    this.clearMemoryCache();
    await this.clearDiskCache();
    this.clearPrefetchTracking();
  }

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

