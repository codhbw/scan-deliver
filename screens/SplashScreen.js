/**
 * Created by Surface Book on 31.05.2017.
 */
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Constants } from 'expo';

export default class SplashScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../assets/images/sd-logo-schrift.png')}
                    style={{ height: 110 }}
                    resizeMode={'contain'}
                />

                <Text style={styles.title}>
                    Willkommen
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#3498db',
    },
    title: {
        margin: 70,
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFF'
    },
});
