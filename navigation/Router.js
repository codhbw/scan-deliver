import {createRouter} from "@expo/ex-navigation";
import ScanScreen from "../screens/ScanScreen";
import SettingsScreen from "../screens/SettingsScreen";
import RootNavigation from "./RootNavigation";
import CartScreen from "../screens/CartScreen";
import Login from "../screens/Login";
import AdressenScreen from "../screens/AdressenScreen";
import SplashScreen from "../screens/SplashScreen";

import {View, Text} from "react-native";
import React from "react";

function makeStore () {
  var state = {
    items: [],
    sum: 0
  };

  var itemChangeSubscriberFuncs = [];
  var itemChangeSubscriberKeys = [];

  addItem = (item) => {
    console.log("Adding an item!!");
    item.key = state.items.length;
    let items = state.items;
    items.push(item);
    let sum = parseFloat(parseFloat(state.sum) + parseFloat(item.preis));
    Object.assign(state, {sum: sum}, {items: items});
    sendItemChangeUpdates();
  };

  removeItemByKey = (key) => {
    if (state.items != null && state.items.length > 0) {
      console.log("Removing an item with key = " + key);

      var deleteIndex = null;
      let items = state.items;
      console.log("ITEMS:::");
      console.log(items);
      let itemAtIndex = null;
      for (let i = 0; i < items.length; i++) {
        itemAtIndex = items[i];
        console.log("Ist " + key + " = " + itemAtIndex.key + "?");
        if (itemAtIndex.key == key) {
          deleteIndex = i;
          break;
        }
      }

      console.log("deleteIndex:");
      console.log(deleteIndex);

      let sum = parseFloat(parseFloat(state.sum) - parseFloat(itemAtIndex.preis));
      if (sum < 0) {
        sum = 0;
      }

      if (deleteIndex !== null) {
        items.splice(deleteIndex, 1);
      }

      Object.assign(state, {sum: sum}, {items: items});

      sendItemChangeUpdates();
    } else {
      console.log("Store: Cannot remove item - no items");
    }
  };

  subscribeForItemChange = (key, func) => {
    if (!isSubscribed(key)) {
      var funcs = itemChangeSubscriberFuncs;
      funcs.push(func);
      itemChangeSubscriberFuncs = funcs;

      var keys = itemChangeSubscriberKeys;
      keys.push(key);
      itemChangeSubscriberKeys = keys;

      console.log("Added Subscriber with key = " + key);
      console.log("Subscriber Count = " + itemChangeSubscriberFuncs.length);

      if (state.items != null && state.items.length > 0) {
        func();
        console.log("Directly notifying observer because he missed data");
      }
    }
  };

  sendItemChangeUpdates = () => {
    console.log("Notifying observers");
    itemChangeSubscriberFuncs.forEach((func) => {
      console.log("Calling function of subscriber");
      func();
    })
  };

  isSubscribed = (key) => {
    return itemChangeSubscriberKeys.includes(key);
  };

  clear = () => {
    Object.assign(state, {sum: 0}, {items: []});
    sendItemChangeUpdates();
  };

  return {
    addItem: addItem,
    getState: () => { return state },
    subscribeForItemChange: subscribeForItemChange,
    isSubscribed: isSubscribed,
    removeItemByKey: removeItemByKey,
    clear: clear
  }
}

var store = makeStore();

const CartScreenWithStore = () => (
    <CartScreen store={store} />
);

const ScanScreenWithStore = () => (
    <ScanScreen store={store} />
);

export default createRouter(() => ({
  home: () => ScanScreenWithStore,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
  cart: () => CartScreenWithStore,
  login: () => Login,
  adressen: () => AdressenScreen,
  welcome: () => SplashScreen
}));
