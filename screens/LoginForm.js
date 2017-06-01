/**
 * Created by Surface Book on 30.05.2017.
 */
/**
 * Created by Surface Book on 30.05.2017.
 */
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, KeyboardAvoidingView, Alert, TouchableOpacity, NativeModules, Platform, Button } from 'react-native';
import { withNavigation } from '@expo/ex-navigation';
import Router from '../navigation/Router';

let authFunction;

@withNavigation
export default class LoginForm extends Component {
    constructor()
    {
        super();
    }
    componentDidMount()
    {
        authFunction();
    }
    _zahlungAbwickeln = () => {
        Alert.alert('Einkauf abgeschlossen!', 'Weitere Details haben wir an Ihre E-Mail-Adresse geschickt.')
        this.props.navigator.pop();
    };
    _registrieren = () => {
        Alert.alert(
            'Erfolg!',
            'Sie sind nun angemeldet',
        );
    };
    state = {
        waiting: false,
    };

    render() {
        if (Platform.OS === 'android') {
            authFunction = async () => {
                this.setState({ waiting: true });
                try {
                    let result = await NativeModules.ExponentFingerprint.authenticateAsync();
                    if (result.success) {
                        this._zahlungAbwickeln()
                    } else {
                        console.log("TouchID fehlgeschlagen");
                    }
                } finally {
                    this.setState({ waiting: false });
                }
            };
        } else if (Platform.OS === 'ios') {
            authFunction = async () => {
                let result = await NativeModules.ExponentFingerprint.authenticateAsync(
                    'Melde dich per TouchID bei Scan & Deliver an'
                );
                if (result.success) {
                    this._zahlungAbwickeln();
                } else {
                    console.log("TouchID fehlgeschlagen");
                }
            };
        }
        return (
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="E-Mail-Adresse oder VR-NetKey"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    autoCorrect={false}
                    returnKeyType="next"
                    keyboardType="email-address"
                    onSubmitEditing={() => this.passwordInput.focus()}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Passwort"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    password
                    returnKeyType="go"
                    ref={(input) => this.passwordInput = input}
                />

                <TouchableOpacity
                    onPress={this._zahlungAbwickeln}
                    style={styles.loginButton}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this._registrieren}
                    style={styles.loginButton}>
                    <Text style={styles.loginText}>REGISTRIEREN</Text>
                </TouchableOpacity>

            </View>
    );
    }
}

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 20,
        justifyContent:'flex-end'
    },
    input: {
        width: 300,
        height: 40,
        padding: 8,
        color: '#FFF',
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10
    },
    loginButton: {
        backgroundColor: '#2980b9',
        paddingVertical: 10,
        marginTop: 10,
    }
    ,
    loginText:
        {
            textAlign: 'center',
            color: '#FFF',
            fontWeight: '200'
        }
});