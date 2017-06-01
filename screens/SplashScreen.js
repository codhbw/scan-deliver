/**
 * Created by Surface Book on 31.05.2017.
 */
import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, View, Platform } from 'react-native';
import { Constants } from 'expo';
import { withNavigation, NavigationProvider, StackNavigation } from '@expo/ex-navigation';
import Router from '../navigation/Router';

@withNavigation
export default class SplashScreen extends React.Component {

    _root = () => {
        this.props.navigator.replace('rootNavigation');
    };

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this._root}>
                <Image
                    source={require('../assets/images/sd-logo-schrift.png')}
                    style={{ height: 150 }}
                    resizeMode={'contain'}
                />

                <Text style={styles.title}>
                    Willkommen
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
    },
    title: {
        margin: 70,
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
