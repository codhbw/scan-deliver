/**
 * Created by Surface Book on 30.05.2017.
 */
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, KeyboardAvoidingView, Alert, TouchableOpacity, StatusBar } from 'react-native';
import { Constants } from 'expo';
import LoginForm from './LoginForm';

export default class Login extends Component {
    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../assets/images/sd-logo-schrift.png')}
                        style={{ height: 110 }}
                        resizeMode={'contain'}
                    />
                </View>
                <LoginForm/>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#3498db'
    },
    logoContainer: {

    },
    title: {
        marginTop: 15,
        color: '#FFF',
        width: 200,
        textAlign: 'center',
        opacity: 0.9
    },
});