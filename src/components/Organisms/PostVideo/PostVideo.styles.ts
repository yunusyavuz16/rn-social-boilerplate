import { StyleSheet } from 'react-native';

/**
 * Create styles based on theme
 */
export const createStyles = () =>
  StyleSheet.create({
    container: {
      width: '100%',
      aspectRatio: 4 / 5, // 4:5 ratio for videos
      backgroundColor: 'transparent',
      overflow: 'hidden', // Hide any controls that might appear outside bounds
    },
    video: {
      width: '100%',
      height: '100%',
    },
    thumbnail: {
      position: 'absolute',
      zIndex: 10,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0.5,
    },
  });

