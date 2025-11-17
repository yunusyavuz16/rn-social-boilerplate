import { ThemedText } from '@/components/Atoms/ThemedText/ThemedText';
import { ThemedView } from '@/components/Atoms/ThemedView/ThemedView';
import { useTheme } from '@/hooks/useTheme';
import type { ThemeMode } from '@styles/theme';
import React from 'react';
import { Pressable } from 'react-native';
import type { ProfileStyles } from '../../ProfileScreen.styles';

export interface ThemeSwitcherSectionProps {
  styles: ProfileStyles;
}

export const ThemeSwitcherSection: React.FC<ThemeSwitcherSectionProps> = ({ styles }) => {
  const { mode, setTheme } = useTheme();
  const handleThemeChange = async (newMode: ThemeMode) => {
    await setTheme(newMode);
  };
  return (
    <ThemedView style={styles.themeSection}>
      <ThemedText style={styles.sectionTitle}>Theme</ThemedText>
      <ThemedView style={styles.themeOptions}>
        <Pressable
          style={[styles.themeOption, mode === 'light' && styles.themeOptionActive]}
          onPress={() => handleThemeChange('light')}>
          <ThemedText
            style={[styles.themeOptionText, mode === 'light' && styles.themeOptionTextActive]}>
            Light Mode
          </ThemedText>
        </Pressable>
        <Pressable
          style={[styles.themeOption, mode === 'dark' && styles.themeOptionActive]}
          onPress={() => handleThemeChange('dark')}>
          <ThemedText
            style={[styles.themeOptionText, mode === 'dark' && styles.themeOptionTextActive]}>
            Dark Mode
          </ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
};
