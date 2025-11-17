import React from 'react';
import {Button} from '@/components/Molecules/Button/Button';
import {ThemedView} from '@/components/Atoms/ThemedView/ThemedView';
import type {ProfileStyles} from '../../ProfileScreen.styles';

export interface ActionsSectionProps {
  styles: ProfileStyles;
  isLoggingOut: boolean;
  onLogout: () => void;
}

/**
 * Renders the logout action button with loading state.
 */
export const ActionsSection: React.FC<ActionsSectionProps> = ({
  styles,
  isLoggingOut,
  onLogout,
}) => (
  <ThemedView style={styles.actions}>
    <Button
      title={isLoggingOut ? 'Logging out...' : 'Logout'}
      onPress={onLogout}
      loading={isLoggingOut}
      disabled={isLoggingOut}
      variant="secondary"
      style={[styles.actionButton, styles.logoutButton]}
    />
  </ThemedView>
);

