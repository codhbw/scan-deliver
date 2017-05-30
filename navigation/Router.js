import { createRouter } from '@expo/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import Scan from '../screens/Scan'
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  home: () => Scan,
  links: () => LinksScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
}));
