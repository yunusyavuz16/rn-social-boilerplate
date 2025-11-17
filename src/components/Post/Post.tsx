import { Avatar } from '@components/Avatar/Avatar';
import { Icon } from '@components/Icon/Icon';
import { PostImageCarousel } from '@components/PostImageCarousel/PostImageCarousel';
import { PostVideo } from '@components/PostVideo/PostVideo';
import { ThemedText } from '@components/ThemedText/ThemedText';
import { ThemedView } from '@components/ThemedView/ThemedView';
import { ICONS } from '@constants/icons.constants';
import { useTheme } from '@hooks/useTheme';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStyles } from './Post.styles';
import type { PostProps } from './PostProps';

/**
 * Post component displaying user post with media
 * with memory optimization to pause videos when not visible
 */
export const Post: React.FC<PostProps> = ({ post, onLike, isVisible = true }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const handleLike = () => {
    onLike(post.id);
  };

  // Determine media rendering:
  // - Carousel for exactly 2 images (swipeable)
  // - Single video player for 1 video (no carousel)
  const isImageCarousel = post.type === 'images' && post.media.length === 2;
  const isSingleVideo = post.type === 'video' && post.media.length === 1;

  // Pause video if post is not visible (memory optimization)
  const shouldPauseVideo = !isVisible;

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedView style={styles.avatarContainer}>
          <Avatar uri={post.userAvatar} username={post.username} size={32} />
        </ThemedView>
        <ThemedText style={styles.username}>{post.username}</ThemedText>
      </ThemedView>

      {/* Media */}
      <ThemedView style={styles.mediaContainer}>
        {isImageCarousel ? (
          <PostImageCarousel media={post.media} />
        ) : isSingleVideo ? (
          <PostVideo video={post.media[0]} paused={shouldPauseVideo} isVisible={isVisible} />
        ) : null}
      </ThemedView>

      {/* Actions */}
      <ThemedView style={styles.actions}>
        <TouchableOpacity
          onPress={handleLike}
          style={styles.actionButton}
          accessibilityLabel={post.isLiked ? 'Unlike post' : 'Like post'}
          accessibilityRole="button">
          <Icon
            name={post.isLiked ? ICONS.HEART : ICONS.HEART_OUTLINE}
            size={24}
            color={post.isLiked ? theme.colors.like : theme.colors.text}
            family="Ionicons"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          accessibilityLabel="Comment on post"
          accessibilityRole="button">
          <Icon name={ICONS.CHATBUBBLE} size={24} color={theme.colors.text} family="Ionicons" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          accessibilityLabel="Share post"
          accessibilityRole="button">
          <Icon name={ICONS.SHARE} size={24} color={theme.colors.text} family="Ionicons" />
        </TouchableOpacity>
      </ThemedView>

      {/* Likes */}
      <ThemedText style={styles.likes}>{post.likes} likes</ThemedText>

      {/* Caption */}
      <ThemedText style={styles.caption}>
        <ThemedText style={styles.username}>{post.username}</ThemedText> {post.caption}
      </ThemedText>

      {/* Comments */}
      <ThemedText style={styles.comments}>View all {post.comments} comments</ThemedText>
    </ThemedView>
  );
};

Post.displayName = 'Post';
