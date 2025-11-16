import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {PostImageCarousel} from '@components/PostImageCarousel/PostImageCarousel';
import {PostVideo} from '@components/PostVideo/PostVideo';
import {Avatar} from '@components/Avatar/Avatar';
import {Icon} from '@components/Icon/Icon';
import {ICONS} from '@constants/icons.constants';
import {styles} from './Post.styles';
import type {PostProps} from './PostProps';

/**
 * Post component displaying user post with media
 * with memory optimization to pause videos when not visible
 */
export const Post = React.memo<PostProps>(({post, onLike, isVisible = true}) => {
  const handleLike = useCallback(() => {
    onLike(post.id);
  }, [post.id, onLike]);

  // Determine if we should use carousel (multiple items) or single video
  const hasMultipleMedia = post.media.length > 1;
  const isVideoOnly = post.type === 'video' && !hasMultipleMedia;

  // Pause video if post is not visible (memory optimization)
  const shouldPauseVideo = !isVisible;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Avatar uri={post.userAvatar} username={post.username} size={32} />
        </View>
        <Text style={styles.username}>{post.username}</Text>
      </View>

      {/* Media */}
      <View style={styles.mediaContainer}>
        {hasMultipleMedia || (post.type === 'images' && post.media.length > 0) ? (
          <PostImageCarousel media={post.media} isVisible={isVisible} />
        ) : isVideoOnly ? (
          <PostVideo video={post.media[0]} paused={shouldPauseVideo} />
        ) : null}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={handleLike}
          style={styles.actionButton}
          accessibilityLabel={post.isLiked ? 'Unlike post' : 'Like post'}
          accessibilityRole="button">
          <Icon
            name={post.isLiked ? ICONS.HEART : ICONS.HEART_OUTLINE}
            size={24}
            color={post.isLiked ? '#FF3040' : '#000000'}
            family="Ionicons"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          accessibilityLabel="Comment on post"
          accessibilityRole="button">
          <Icon
            name={ICONS.CHATBUBBLE}
            size={24}
            color="#000000"
            family="Ionicons"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          accessibilityLabel="Share post"
          accessibilityRole="button">
          <Icon
            name={ICONS.SHARE}
            size={24}
            color="#000000"
            family="Ionicons"
          />
        </TouchableOpacity>
      </View>

      {/* Likes */}
      <Text style={styles.likes}>{post.likes} likes</Text>

      {/* Caption */}
      <Text style={styles.caption}>
        <Text style={styles.username}>{post.username}</Text> {post.caption}
      </Text>

      {/* Comments */}
      <Text style={styles.comments}>View all {post.comments} comments</Text>
    </View>
  );
});

Post.displayName = 'Post';

