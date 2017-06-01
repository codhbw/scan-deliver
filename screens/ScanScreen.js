/**
 * Created by Surface Book on 30.05.2017.
 */
import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, Image, StatusBar, TouchableOpacity, Modal, KeyboardAvoidingView, TextInput, Button, ScrollView } from 'react-native';
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
            summeColor: '#2ecc71',
        };
    }

   onItemChange() {
       console.log("ScanScreen: onItemChange");
       const storeState = this.props.store.getState();
       console.log(storeState);

       let color = '#2ecc71';
       if (storeState.sum > this.state.limit) {
           color = '#e74c3c';
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

            let alertHeadline = 'QR-Code gescannt';

            var capitalizedType = parsed.type.charAt(0).toUpperCase() + parsed.type.slice(1);
            let description = "\"" + parsed.name  + "\" (" + capitalizedType + ") wurde erkannt.";



            Alert.alert(
                alertHeadline,
                description,
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
            <ScrollView>
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
                    <KeyboardAvoidingView behavior='padding' style={styles.modalerContainer}>
                        <Text style={styles.paragraph}>
                            Was für ein Betrag soll gespendet werden?
                        </Text>
                        <View style={{flexDirection: 'row', height: 50, justifyContent: 'center'}}>
                            <TextInput
                                style={styles.donationInput}
                                value={this.state.donationValue}
                                autoFocus={true}
                                keyboardType='numeric'
                                onChangeText={(value) => {this.setState({donationValue: value})}}/>
                            <Text style={{fontSize: 40}}>€</Text>
                        </View>
                        <View style={styles.buttons}>
                            <TouchableOpacity
                                onPress={() => this.donationOK()}
                                style={styles.donationButton}>
                                <Text style={styles.donationText}>OK</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.donationCancel()}
                                style={styles.donationButton}>
                                <Text style={styles.donationText}>Abbrechen</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
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
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        margin: 10
    },
    paragraph: {
        margin: 24,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
    qrcode: {
        width: 300,
        height: 300
    },
    donationInput: {
        fontSize: 40,
        textAlign: 'center',
        height: 40,
        width: 100
    },
    welcomeImage: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
        marginTop: 20,
    },
    sum: {
        margin: 20,
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2ecc71',
    },
    donationButton: {
        backgroundColor: '#2980b9',
        paddingVertical: 15,
        marginTop: 10
    },
    donationText:
    {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold'
    },
    modalerContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        margin: 30
    },
    buttons: {
        margin: 10,
        justifyContent:'flex-end',
    }
});