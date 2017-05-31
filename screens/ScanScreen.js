/**
 * Created by Surface Book on 30.05.2017.
 */
import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, Image, StatusBar, AsyncStorage, Modal, TouchableHighlight, TextInput, Button } from 'react-native';
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
            items : [],
            hasNewData : false,
            modalVisible : false,
            donationValue : "10",
            aktivesItem : {}
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

    componentDidMount() {
        this._loadData();
    }

    componentWillMount() {
        console.log("ScanScreen: ComponentWillMount");
        this._requestCameraPermission();
    }

    componentWillUpdate() {
        if (this.state.hasNewData) {
            this._loadData();
            this.setState({hasNewData: false});
        }
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

        this.setState({aktivesItem: parsedObject});

        if (parsedObject.type == 'spende') {
            this.setState({modalVisible: true})
        } else {
            this._itemMachen();
        }
    }

    _itemMachen() {
        var neu = {
            ...this.state.aktivesItem,
            key: this.state.items.length + 1
        };
        console.log("Data-Neu:");
        console.log(neu);

        let newItems = this.state.items;
        newItems.push(neu);

        this._save(newItems);
        this.setState({items: newItems, canScan: true, hasNewData: true});
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

    setModalVisible(status) {
        this.setState({modalVisible: status});
    }

    donationOK() {
        console.log("Zu Spenden: " + this.state.donationValue);
        var aktivesItem = this.state.aktivesItem;
        aktivesItem.preis = this.state.donationValue;
        this.setState({aktivesItem: aktivesItem});
        this._itemMachen();
        this.setState({modalVisible: false});
    }

    donationCancel() {
        this.setState({modalVisible: false});
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

                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setModalVisible(false)}>
                    <View style={{marginTop: 22}}>
                        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                            <Text style={styles.paragraph}>
                                Was für ein Betrag soll gespendet werden?
                            </Text>
                            <View style={{flexDirection: 'row', height: 50, justifyContent: 'center'}}>
                                <TextInput
                                    style={styles.donationInput}
                                    value={this.state.donationValue}
                                    onChangeText={(value) => {this.setState({donationValue: value})}}/>
                                <Text style={{fontSize: 28}}>€</Text>
                            </View>
                            <TouchableHighlight onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
                                <View>
                                    <Button title="OK" onPress={() => this.donationOK()} />
                                    <Button title="Abbrechen" onPress={() => this.donationCancel()} />
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
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
    donationInput: {
        fontSize: 24,
        textAlign: 'center',
        height: 40,
        width: 60
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