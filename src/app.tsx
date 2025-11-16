import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppNavigator} from '@navigation/AppNavigator';
import {ErrorBoundary} from '@components/ErrorBoundary/ErrorBoundary';
import {ThemeProvider} from '@contexts/ThemeContext';
import {useTheme} from '@hooks/useTheme';
import {ThemedView} from '@components/ThemedView/ThemedView';
import {createTheme} from '@styles/theme';
import {store} from '@store/store';

/**
 * App content component that uses theme
 * Separated to access theme context
 */
const AppContent: React.FC = () => {
  const {theme, isInitialized} = useTheme();

  // Use current theme or fallback to light theme during initialization
  const currentTheme = isInitialized ? theme : createTheme('light');
  const isDarkMode = currentTheme.mode === 'dark';

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {isInitialized ? (
        <AppNavigator />
      ) : (
        <ThemedView style={{flex: 1}} />
      )}
    </>
  );
};

/**
 * Main app entry point
 */
function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <SafeAreaProvider>
          <ThemeProvider>
            <AppContent />
          </ThemeProvider>
        </SafeAreaProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;

