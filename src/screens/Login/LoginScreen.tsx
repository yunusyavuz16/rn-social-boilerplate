import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '@hooks/useTheme';
import {useBreakpoint} from '@hooks/useBreakpoint';
import {ThemedView} from '@/components/Atoms/ThemedView/ThemedView';
import {ThemedText} from '@/components/Atoms/ThemedText/ThemedText';
import {Input} from '@/components/Molecules/Input/Input';
import {Button} from '@/components/Molecules/Button/Button';
import {useLogin} from './hooks/useLogin';
import {createStyles} from './LoginScreen.styles';

/**
 * Login screen component
 */
export const LoginScreen: React.FC = () => {
  const {theme} = useTheme();
  const {breakpoint} = useBreakpoint();
  const styles = createStyles(theme, breakpoint);
  const {
    username,
    password,
    isLoading,
    error,
    setUsername,
    setPassword,
    handleLogin,
  } = useLogin();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ThemedView style={styles.container}>
          <ThemedText style={styles.title}>Social Boilerplate</ThemedText>
          <ThemedView style={styles.form}>
            <Input
              label="Username"
              value={username}
              onChangeText={setUsername}
              placeholder="Enter username"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />
            {error && <ThemedText style={styles.errorText}>{error}</ThemedText>}
            <Button
              title="Login"
              onPress={handleLogin}
              loading={isLoading}
              disabled={isLoading}
              style={styles.button}
            />
          </ThemedView>
        </ThemedView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

