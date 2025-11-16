/**
 * Post and media related type definitions
 */

export type MediaType = 'image' | 'video';

export interface MediaItem {
  id: string;
  type: MediaType;
  uri: string | number; // Can be string URL or require() number
  thumbnail?: string;
  duration?: number; // Video duration in seconds
}

export type PostType = 'images' | 'video';

export interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar?: string;
  type: PostType;
  media: MediaItem[];
  caption: string;
  likes: number;
  comments: number;
  timestamp: number;
  isLiked: boolean;
}

