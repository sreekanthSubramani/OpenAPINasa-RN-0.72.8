/**
 * @format
 */
import { configureGoogleSignin } from './src/config/googleconfig';


configureGoogleSignin()

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';




AppRegistry.registerComponent(appName, () => App);
