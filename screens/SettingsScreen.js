import React from 'react';
import { ScrollView, StyleSheet, AsyncStorage } from 'react-native';
import { ExpoConfigView } from '@expo/samples';

export default class SettingsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'exp.json',
    },
  };

  componentWillMount() {
    this._clearCache();
  }

  _clearCache = async () => {
    try {
      console.log("Clearing cache");
      await AsyncStorage.removeItem("items");
    } catch (error) {
      console.log("Cannot clear cache");
    }
  }

  render() {
    this._clearCache();
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>

        {/* Go ahead and delete ExpoConfigView and replace it with your
           * content, we just wanted to give you a quick view of your config */}
        <ExpoConfigView />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
