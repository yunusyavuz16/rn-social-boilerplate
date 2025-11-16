import {StyleSheet} from 'react-native';
import {theme} from '@styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  grid: {
    flex: 1,
  },
  gridItem: {
    flex: 1,
    margin: 1,
  },
});

