/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase from '@react-native-firebase/app';

// Initialize Firebase app

if (!firebase.apps.length) {
  // Initialize Firebase app
  firebase.initializeApp();
}

AppRegistry.registerComponent(appName, () => App);
