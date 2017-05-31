/**
 * Created by Surface Book on 30.05.2017.
 */
import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, Image, StatusBar } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';

export default class Scan extends React.Component {
    static route = {
        navigationBar: {
            visible: false,
        },
    };
    state = {
        hasCameraPermission: null,
        // QR Code wird nur gescannt, wenn canScan = true
        canScan: true
    };

    componentDidMount() {
        this._requestCameraPermission();
    }

    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };

    _handleBarCodeRead = data => {
        if (this.state.canScan) {
            this.setState({canScan: false});
            Alert.alert(
                'Danke für die Spende!',
                JSON.stringify(data),
                [
                    {text: "Hinzufügen", onPress: () => this._hinzufuegen(data)}
                ]
            );
        }
    };

    _hinzufuegen(data) {
        this.setState({canScan: true});
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content"/>
                <View style={styles.welcomeContainer}>
                    <Image
                        source={require('../assets/images/sd-logo.png')}
                        style={styles.welcomeImage}
                    />
                </View>
                <Text style={styles.paragraph}>
                    Scanne einen QR-Code
                </Text>
                {this.state.hasCameraPermission === null ?
                    <Text>Requesting for camera permission</Text> :
                    this.state.hasCameraPermission === false ?
                        <Text>Camera permission is not granted</Text> :
                        <BarCodeScanner
                            onBarCodeRead={this._handleBarCodeRead}
                            style={styles.qrcode}
                        />
                }
                <Text style={styles.sum}>
                    99 €
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
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
    qrcode: {
        width: 300,
        height: 300
    },
    welcomeImage: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
    },
    sum: {
        margin: 40,
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    }
});