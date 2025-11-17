import React from 'react';
import {Avatar} from '@/components/Molecules/Avatar/Avatar';
import {ThemedText} from '@/components/Atoms/ThemedText/ThemedText';
import {ThemedView} from '@/components/Atoms/ThemedView/ThemedView';
import type {ProfileStyles} from '../../ProfileScreen.styles';
import type {User} from '@/types/auth.types';

export interface ProfileHeaderSectionProps {
  user: User;
  styles: ProfileStyles;
}

/**
 * Renders the primary profile information including avatar and text details.
 */
export const ProfileHeaderSection: React.FC<ProfileHeaderSectionProps> = ({
  user,
  styles,
}) => (
  <ThemedView style={styles.header}>
    <Avatar uri={user.avatar} username={user.username} size={80} />
    <ThemedText style={styles.username}>{user.username}</ThemedText>
    <ThemedText style={styles.email}>{user.email}</ThemedText>
  </ThemedView>
);

