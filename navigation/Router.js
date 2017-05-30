import {createRouter} from "@expo/ex-navigation";
import Scan from "../screens/Scan";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import RootNavigation from "./RootNavigation";
import CartScreen from "../screens/CartScreen";

export default createRouter(() => ({
  home: () => Scan,
  links: () => LinksScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
  cart: () => CartScreen
}));
