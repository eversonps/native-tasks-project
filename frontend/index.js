/**
 * @format
 */

import {AppRegistry} from 'react-native';
import TaskList from './src/screens/TaskList';
import {name as appName} from './app.json';
import Auth from './src/screens/Auth'
AppRegistry.registerComponent(appName, () => Auth);
