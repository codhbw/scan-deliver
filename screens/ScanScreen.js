/**
 * Created by Surface Book on 30.05.2017.
 */
import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, Image, StatusBar, AsyncStorage } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';

export default class Scan extends React.Component {
    static route = {
        navigationBar: {
            visible: false,
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            // QR Code wird nur gescannt, wenn canScan = true
            canScan: true,
            items : []
        };
    }

    _loadData = async () => {
        try {
            console.log("ScanScreen: Read from AsyncStorage");
            const value = await AsyncStorage.getItem("items");
            if (value != null) {
                console.log("Value from AsyncStorage = " + value);
                this.setState({items: JSON.parse(value)});
            };
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    componentWillMount() {
        console.log("ScanScreen: ComponentWillMount");
        this._requestCameraPermission();
        this._loadData();
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
                "",
                [
                    {text: "Ignorieren", onPress: () => this._ignorieren(data)},
                    {text: "Hinzufügen", onPress: () => this._hinzufuegen(data)}
                ]
            );
        }
    };

    _hinzufuegen(data) {
        console.log("ScanScreen - State.Items = " + this.state.items);

        let parsedObject = JSON.parse(data.data);
        console.log("Data:");
        console.log(data.data);

        var neu = {
            ...parsedObject,
            key: this.state.items.length + 1
        };
        console.log("Data-Neu:");
        console.log(neu);

        let newItems = this.state.items;
        newItems.push(neu);

        this._save(newItems);
        this.setState({items: newItems, canScan: true});
    }

    _save = async (items) => {
        try {
            console.log("ScanScreen - Save");
            if (items == null) {
                console.log("ScanScreen - Items = Null");
                items = [];
            }
            console.log("ScanScreen: Saving object into 'items': " + JSON.stringify(items));
            await AsyncStorage.setItem("items", JSON.stringify(items));
        } catch (error) {
            console.log("ScanScreen Error: " + error);
        }
    }

    _ignorieren(data) {
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
                    Füge ein Produkt hinzu, indem Du einen QR-Code scannst.
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

//export default connect(mapStateToProps, mapDispatchToProps)(Scan);

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