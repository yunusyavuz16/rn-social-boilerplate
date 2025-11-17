import React from 'react';
import {ThemedText} from '@/components/Atoms/ThemedText/ThemedText';
import {ThemedView} from '@/components/Atoms/ThemedView/ThemedView';
import type {ProfileStyles} from '../../ProfileScreen.styles';

export interface StatsSectionProps {
  styles: ProfileStyles;
}

/**
 * Shows static stats for posts, followers, and following counts.
 */
export const StatsSection: React.FC<StatsSectionProps> = ({styles}) => (
  <ThemedView style={styles.stats}>
    <ThemedView style={styles.statItem}>
      <ThemedText style={styles.statValue}>42</ThemedText>
      <ThemedText style={styles.statLabel}>Posts</ThemedText>
    </ThemedView>
    <ThemedView style={styles.statItem}>
      <ThemedText style={styles.statValue}>1.2K</ThemedText>
      <ThemedText style={styles.statLabel}>Followers</ThemedText>
    </ThemedView>
    <ThemedView style={styles.statItem}>
      <ThemedText style={styles.statValue}>856</ThemedText>
      <ThemedText style={styles.statLabel}>Following</ThemedText>
    </ThemedView>
  </ThemedView>
);

