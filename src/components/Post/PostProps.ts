import type {Post} from '../../types/post.types';

export interface PostProps {
  post: Post;
  onLike: (postId: string) => void;
  isVisible?: boolean;
}

