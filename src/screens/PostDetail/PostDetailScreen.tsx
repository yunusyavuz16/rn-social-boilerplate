import React, {useCallback} from 'react';
import {View, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import {Post} from '@components/Post/Post';
import {BackButton} from '@components/BackButton/BackButton';
import {useToggleLikeMutation} from '@store/api/postsApi';
import {styles} from './PostDetailScreen.styles';
import type {PostDetailRouteParams} from '../../navigation/types';

/**
 * Post detail screen displaying a single post in full view
 */
export const PostDetailScreen: React.FC = () => {
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
      <View style={styles.header}>
        <BackButton />
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Post post={params.post} onLike={handleLike} isVisible={true} />
      </ScrollView>
    </SafeAreaView>
  );
};

