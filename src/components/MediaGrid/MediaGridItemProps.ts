import type {MediaItem} from '../../types/post.types';

export interface MediaGridItemProps {
  item: MediaItem;
  index: number;
  isVisible: boolean;
  onPress?: () => void;
  onViewableItemsChanged?: (isVisible: boolean) => void;
}

