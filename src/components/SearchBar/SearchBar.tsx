import React from 'react';
import {View, TextInput} from 'react-native';
import {Icon} from '@components/Icon/Icon';
import {ICONS} from '@constants/icons.constants';
import {styles} from './SearchBar.styles';
import type {SearchBarProps, SearchBarRef} from './SearchBarProps';

/**
 * Search bar component with ref forwarding for programmatic focus
 */
export const SearchBar = React.memo(
  React.forwardRef<SearchBarRef, SearchBarProps>(
    ({value, onChangeText, onFocus, placeholder = 'Search...', testID}, ref) => {
      return (
        <View style={styles.container}>
          <Icon
            name={ICONS.SEARCH}
            size={20}
            color="#8E8E93"
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
            placeholderTextColor="#8E8E93"
            autoCapitalize="none"
            autoCorrect={false}
            testID={testID}
          />
        </View>
      );
    },
  ),
);

SearchBar.displayName = 'SearchBar';

