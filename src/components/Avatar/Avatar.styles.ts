import {StyleSheet} from 'react-native';
import {theme} from '@styles/theme';

export const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    backgroundColor: theme.colors.primary,
  },
  initials: {
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.bold,
  },
});

