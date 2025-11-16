import type {Post, MediaItem} from '../types/post.types';

/**
 * DTO transformers for type-safe data transformation
 * Converts API responses to app entities
 */

/**
 * Transform media item DTO to MediaItem entity
 */
export const transformMediaItem = (dto: any): MediaItem => {
  return {
    id: dto.id || String(Date.now()),
    type: dto.type || 'image',
    uri: dto.uri || dto.url,
    thumbnail: dto.thumbnail || dto.thumbUrl,
    duration: dto.duration, // Preserve duration for videos
  };
};

/**
 * Transform post DTO to Post entity
 */
export const transformPost = (dto: any): Post => {
  return {
    id: dto.id || String(Date.now()),
    userId: dto.userId || dto.user_id || '',
    username: dto.username || dto.user?.username || 'unknown',
    userAvatar: dto.userAvatar || dto.user?.avatar || dto.user?.avatar_url,
    type: dto.type || (dto.media?.[0]?.type === 'video' ? 'video' : 'images'),
    media: (dto.media || []).map(transformMediaItem),
    caption: dto.caption || dto.description || '',
    likes: dto.likes || dto.like_count || 0,
    comments: dto.comments || dto.comment_count || 0,
    timestamp: dto.timestamp || dto.created_at || Date.now(),
    isLiked: dto.isLiked || dto.is_liked || false,
  };
};

/**
 * Transform array of post DTOs to Post entities
 */
export const transformPosts = (dtos: any[]): Post[] => {
  return dtos.map(transformPost);
};

