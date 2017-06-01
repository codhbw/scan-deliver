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
            modalVisible : false,
            donationValue : "10",
            aktivesItem : {},
            summe : 0,
            limit: 500,
            summeColor: '#00cc00',
        };
    }

   onItemChange() {
       console.log("ScanScreen: onItemChange");
       const storeState = this.props.store.getState();
       console.log(storeState);

       let color = '#00cc00';
       if (storeState.sum > this.state.limit) {
           color = '#cc0000';
       }

       this.setState({summe: storeState.sum, canScan: true, summeColor: color});
   }

    componentWillMount() {
        this.props.store.subscribeForItemChange("ScanScreen", () => this.onItemChange())
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

            let parsed = JSON.parse(data.data);

            let alertHeadline = 'PLATZHALTER';
            if (parsed.type == 'spende') {
                alertHeadline = 'Spende erkannt';
            } else if (parsed.type == 'kleidung') {
                alertHeadline = 'Kleidungsstück erkannt';
            }
            Alert.alert(
                alertHeadline,
                "",
                [
                    {text: "Ignorieren", onPress: () => this._ignorieren(parsed)},
                    {text: "Hinzufügen", onPress: () => this._hinzufuegen(parsed)}
                ]
            );
        }
    };

    _hinzufuegen(data) {
        console.log("Data:");
        console.log(data);

        this.setState({aktivesItem: data});

        if (data.type == 'spende') {
            this.setState({modalVisible: true})
        } else {
            this.props.store.addItem(data);
        }
    }

    _ignorieren(data) {
        this.setState({canScan: true});
    }

    setModalVisible(status) {
        this.setState({modalVisible: status});
    }

    setGreenColor() {
        this.setState({summeColor: '#00cc00'});
    }

    setRedColor() {
        this.setState({summeColor: '#cc0000'});
    }

    donationOK() {
        console.log("Zu Spenden: " + this.state.donationValue);
        var aktivesItem = this.state.aktivesItem;
        aktivesItem.preis = this.state.donationValue;
        this.setState({aktivesItem: aktivesItem});
        this.props.store.addItem(aktivesItem)
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
                <Text style={{margin: 40, fontSize: 36, fontWeight: 'bold', textAlign: 'center', color: this.state.summeColor}}>
                    {this.state.summe} €
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