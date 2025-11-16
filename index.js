/**
 * @format
 */

// MUST be at the very top - before any other imports
import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
