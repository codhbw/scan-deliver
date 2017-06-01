import React from 'react';
import { AsyncStorage, ScrollView, StyleSheet, Image, Text, View, TouchableHighlight, Platform } from 'react-native';
import TouchableNativeFeedback from '@expo/react-native-touchable-native-feedback-safe';
import { ExpoConfigView } from '@expo/samples';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import Layout from '../constants/Layout';
import { withNavigation } from '@expo/ex-navigation';
import Router from '../navigation/Router'

@withNavigation
export default class SettingsScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  };

  _openAddressScreen = () => {
      this.props.navigator.push(Router.getRoute('adressen'));
  };

  render() {
    return (
        <ScrollView>
          <View style={styles.container}>
                <Image
                    source={require('../assets/images/gruppenbild-small.jpg')}
                    style={styles.profilbild}
                    resizeMode={'center'}
                />

                <TouchableNativeFeedback
                    fallback={TouchableHighlight}
                    underlayColor="#ccc"
                    onPress={this._openAddressScreen}
                    style={styles.row}>
                  <View style={styles.buttonContainer}>
                    <Entypo name="address" size={30} color="#b8c3c9" />
                  </View>

                  <Text style={styles.title}>
                      Adressen
                  </Text>

                  <View style={styles.buttonContainer}>
                    <MaterialIcons name="chevron-right" size={30} color="#b8c3c9" />
                  </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback
                    fallback={TouchableHighlight}
                    underlayColor="#ccc"
                    style={styles.row}>
                  <View style={styles.buttonContainer}>
                    <MaterialIcons name="payment" size={30} color="#b8c3c9" />
                  </View>

                  <Text style={styles.title}>
                    Kontoverbindungen
                  </Text>

                  <View style={styles.buttonContainer}>
                    <MaterialIcons name="chevron-right" size={30} color="#b8c3c9" />
                  </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback
                    fallback={TouchableHighlight}
                    underlayColor="#ccc"
                    style={styles.row}>
                  <View style={styles.buttonContainer}>
                    <MaterialIcons name="aspect-ratio" size={30} color="#b8c3c9" />
                  </View>

                  <Text style={styles.title}>
                    Meine Limits
                  </Text>

                  <View style={styles.buttonContainer}>
                    <MaterialIcons name="chevron-right" size={30} color="#b8c3c9" />
                  </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback
                    fallback={TouchableHighlight}
                    underlayColor="#ccc"
                    style={styles.row}>
                  <View style={styles.buttonContainer}>
                    <MaterialIcons name="receipt" size={30} color="#b8c3c9" />
                  </View>

                  <Text style={styles.title}>
                    Rechnungen
                  </Text>

                  <View style={styles.buttonContainer}>
                    <MaterialIcons name="chevron-right" size={30} color="#b8c3c9" />
                  </View>
                </TouchableNativeFeedback>
          </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  profilbild: {
    height:128,
    width: 128,
    borderRadius: 64,
    margin: 30
  },
  title: {
    fontSize: 16,
    padding: 10,
    flex: 1
  },
  row: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: Platform.OS === 'android' ? 1 : StyleSheet.hairlineWidth,
    width: Layout.window.width,
    padding: 20
  },
  buttonContainer: {
    paddingRight: 15,
  },
});
