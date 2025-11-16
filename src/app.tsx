import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppNavigator} from '@navigation/AppNavigator';
import {ErrorBoundary} from '@components/ErrorBoundary/ErrorBoundary';
import {store} from '@store/store';

/**
 * Main app entry point
 */
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <SafeAreaProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <AppNavigator />
        </SafeAreaProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;

