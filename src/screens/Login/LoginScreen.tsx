import React from 'react';
import {View, Text, KeyboardAvoidingView, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Input} from '@components/Input/Input';
import {Button} from '@components/Button/Button';
import {useLogin} from './useLogin';
import {styles} from './LoginScreen.styles';

/**
 * Login screen component
 */
export const LoginScreen: React.FC = () => {
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
        <View style={styles.container}>
          <Text style={styles.title}>Instagram Clone</Text>
          <View style={styles.form}>
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
            {error && <Text style={styles.errorText}>{error}</Text>}
            <Button
              title="Login"
              onPress={handleLogin}
              loading={isLoading}
              disabled={isLoading}
              style={styles.button}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

