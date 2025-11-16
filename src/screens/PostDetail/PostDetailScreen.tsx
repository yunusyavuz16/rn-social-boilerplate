import React, {useCallback} from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import {useTheme} from '@hooks/useTheme';
import {ThemedView} from '@components/ThemedView/ThemedView';
import {Post} from '@components/Post/Post';
import {BackButton} from '@components/BackButton/BackButton';
import {useToggleLikeMutation} from '@store/api/postsApi';
import {createStyles} from './PostDetailScreen.styles';
import type {PostDetailRouteParams} from '../../navigation/types';

/**
 * Post detail screen displaying a single post in full view
 */
export const PostDetailScreen: React.FC = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const route = useRoute();
  const params = route.params as PostDetailRouteParams;
  const [toggleLike] = useToggleLikeMutation();

  const handleLike = useCallback(
    (postId: string) => {
      toggleLike({postId});
    },
    [toggleLike],
  );

  if (!params?.post) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ThemedView style={styles.header}>
        <BackButton />
      </ThemedView>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Post post={params.post} onLike={handleLike} isVisible={true} />
      </ScrollView>
    </SafeAreaView>
  );
};

