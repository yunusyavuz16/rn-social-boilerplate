/**
 * Navigation type definitions
 */

import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {Post} from '../types/post.types';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Feed: undefined;
  Search: undefined;
  Profile: undefined;
  PostDetail: {post: Post};
};

export type PostDetailRouteParams = {
  post: Post;
};

export type NavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;
