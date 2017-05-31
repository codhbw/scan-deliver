/**
 * Created by Surface Book on 31.05.2017.
 */
import React, { Component } from 'react'
import { FlatList, Text, StyleSheet, View, Platform, ScrollView, TouchableHighlight, Che } from 'react-native';
import Layout from '../constants/Layout';
import RadioButton from 'radio-button-react-native';
import TouchableNativeFeedback from '@expo/react-native-touchable-native-feedback-safe';
import CheckBox from 'react-native-checkbox';

const rows = [
    {id: 0, strasse: 'Frankfurter Straße', nummer: '5 b', plz: '78987', stadt: 'Frankfurt / Main'},
    {id: 1, strasse: 'Lange Straße', nummer: '42', plz: '12345', stadt: 'Berlin'},
    {id: 2, strasse: 'Talstraße', nummer: '18', plz: '32415', stadt: 'Düsseldorf'},
]

const extractKey = ({id}) => id

export default class AdressenScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedLieferadresse: 0, selectedRechnungsadresse: 0, backgroundColor: '#ccc' };
    }

    _switchStatus(item){
        console.log("Pressed " + item.strasse);
        this.setState({
            selectedLieferadresse: item.id,
        });
        console.log(this.state.selectedLieferadresse);
    }

    renderItem = ({item}) => {
        return (
            <TouchableNativeFeedback
                fallback={TouchableHighlight}
                underlayColor="#ccc"
                onPress={() => this._switchStatus(item)}
                style={this.state.selectedLieferadresse === item.id? styles.selectedAdresse : styles.adresse}>
                <Text style={ this.state.selectedLieferadresse === item.id ? styles.selectedText : styles.normalerText }>
                    {item.strasse} {item.nummer}
                </Text>
                <Text style={ this.state.selectedLieferadresse === item.id ? styles.selectedText : styles.normalerText }>
                    {item.plz} {item.stadt}
                </Text>
            </TouchableNativeFeedback>
        )
    }

    render() {
        return (
            <ScrollView>
            <View style={styles.container}>
                <Text style={styles.header}>
                    Lieferadressen
                </Text>
                <FlatList
                    style={styles.list}
                    data={rows}
                    renderItem={this.renderItem}
                    keyExtractor={extractKey}
                />
                <Text style={styles.header}>
                    Rechnungsadressen
                </Text>
                <View style={styles.checkbox}>
                <CheckBox
                    label='Dieselbe wie die Lieferadresse'
                    checked={true}
                />
                </View>
            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
    },
    header: {
        backgroundColor: '#3498db',
        color: 'white',
        fontWeight: 'bold',
        padding: 15,
        fontSize: 20
    },
    adresse: {
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderBottomColor: '#e5e5e5',
        borderBottomWidth: Platform.OS === 'android' ? 1 : StyleSheet.hairlineWidth,
        width: Layout.window.width,
        padding: 15,
    },
    selectedAdresse: {
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderBottomColor: '#e5e5e5',
        borderBottomWidth: Platform.OS === 'android' ? 1 : StyleSheet.hairlineWidth,
        width: Layout.window.width,
        padding: 15,
        backgroundColor: '#2980b9'
    },
    normalerText: {
        fontSize: 16,
        padding: 5
    },
    selectedText: {
        fontSize: 16,
        color: '#FFF',
        padding: 5
    },
    checkbox: {
        padding: 20
    }
})