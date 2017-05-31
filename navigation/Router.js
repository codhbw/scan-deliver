import {createRouter} from "@expo/ex-navigation";
import ScanScreen from "../screens/ScanScreen";
import SettingsScreen from "../screens/SettingsScreen";
import RootNavigation from "./RootNavigation";
import CartScreen from "../screens/CartScreen";
import Login from "../screens/Login";
import AdressenScreen from "../screens/AdressenScreen";
import SplashScreen from "../screens/SplashScreen";

export default createRouter(() => ({
  home: () => ScanScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
  cart: () => CartScreen,
  login: () => Login,
  adressen: () => AdressenScreen,
  welcome: () => SplashScreen
}));
