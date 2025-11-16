import {EXTERNAL_IMAGE_URLS} from '@constants/api.constants';
import type {MediaItem} from '../types/post.types';

/**
 * Video duration mapping (in seconds)
 * Index corresponds to video-1 through video-10
 */
const VIDEO_DURATIONS: number[] = [8, 7, 7, 5, 5, 12, 32, 50, 12, 49];

/**
 * Get video duration from video asset index
 */
const getVideoDurationByIndex = (index: number): number | undefined => {
  if (index >= 0 && index < VIDEO_DURATIONS.length) {
    return VIDEO_DURATIONS[index];
  }
  return undefined;
};

/**
 * Mock media service
 * Provides media URLs for search grid
 */
class MediaService {
  private generateMockMedia(): MediaItem[] {
    const media: MediaItem[] = [];
    const imageUris = [
      require('../assets/images/image-1.jpg'),
      require('../assets/images/image-2.jpg'),
      require('../assets/images/image-3.jpg'),
      require('../assets/images/image-4.jpg'),
    ];
    const videoUris = [
      require('../assets/videos/video-1.mp4'),
      require('../assets/videos/video-2.mp4'),
      require('../assets/videos/video-3.mp4'),
      require('../assets/videos/video-4.mp4'),
    ];

    // Add images (mix of local and external)
    for (let i = 0; i < 20; i++) {
      media.push({
        id: `media_img_${i}`,
        type: 'image',
        uri: i % 3 === 0
          ? EXTERNAL_IMAGE_URLS[i % EXTERNAL_IMAGE_URLS.length]
          : imageUris[i % imageUris.length],
      });
    }

    // Add videos
    for (let i = 0; i < 10; i++) {
      const videoIndex = i % videoUris.length;
      media.push({
        id: `media_video_${i}`,
        type: 'video',
        uri: videoUris[videoIndex],
        duration: getVideoDurationByIndex(videoIndex),
      });
    }

    return media;
  }

  /**
   * Get all media items
   */
  async getMedia(): Promise<MediaItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.generateMockMedia());
      }, 300);
    });
  }

  /**
   * Search media (mock - returns filtered results)
   */
  async searchMedia(query: string): Promise<MediaItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allMedia = this.generateMockMedia();
        // Simple mock search - returns all media if query exists
        const results = query.trim()
          ? allMedia.filter((_, index) => index % 2 === 0 || Math.random() > 0.5)
          : allMedia;
        resolve(results);
      }, 300);
    });
  }
}

export const mediaService = new MediaService();

