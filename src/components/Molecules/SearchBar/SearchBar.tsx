import { Icon } from '@/components/Atoms/Icon/Icon';
import { ThemedView } from '@/components/Atoms/ThemedView/ThemedView';
import { ICONS } from '@constants/icons.constants';
import { useTheme } from '@hooks/useTheme';
import React from 'react';
import { TextInput } from 'react-native';
import { createStyles } from './SearchBar.styles';
import type { SearchBarProps, SearchBarRef } from './SearchBarProps';

/**
 * Search bar component with ref forwarding for programmatic focus
 * Supports dark mode theming
 */
export const SearchBar = React.forwardRef<SearchBarRef, SearchBarProps>(
  ({ value, onChangeText, onFocus, placeholder = 'Search...', testID, disabled = false }, ref) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
      <ThemedView style={styles.container}>
        <Icon
          name={ICONS.SEARCH}
          size={20}
          color={theme.colors.textSecondary}
          family="Ionicons"
          style={styles.searchIcon}
        />
        <TextInput
          ref={ref}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          autoCapitalize="none"
          autoCorrect={false}
          testID={testID}
          selectTextOnFocus={false}
          editable={!disabled}
        />
      </ThemedView>
    );
  },
);

SearchBar.displayName = 'SearchBar';
