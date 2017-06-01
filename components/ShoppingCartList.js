import React, { Component } from 'react'
import { FlatList, Text, StyleSheet, AsyncStorage, View, TouchableOpacity, Platform, Alert } from 'react-native'
import Kleidung from './Kleidung'
import Spende from './Spende'
import DefaultItem from "./DefaultItem"
import Swipeout from 'react-native-swipeout';
import { withNavigation } from '@expo/ex-navigation';
import Router from '../navigation/Router'

const extractKey = ({key}) => key

@withNavigation
export default class ShoppingCartList extends Component {

    constructor(props) {
        super(props);
        console.log("Constructor von Shoppingcart called");
    }

    componentWillReceiveProps(nextProps) {
        console.log("NEXT PROPS COMING");
        console.log(nextProps);
        this.setState({items: nextProps.items, sum: nextProps.sum});
    }

    removeItem(index) {
        return [
        {
            text: 'Bearbeiten',
            backgroundColor: '#00cc00',
            onPress: () => {
                console.log("Editiere Item");
            }
        },
            {
                text: 'Löschen',
                backgroundColor: '#cc0000',
                onPress: () => {
                    console.log("LÖSCHE INDEX = " + index);
                    this._removeAtKey(index);
                }
            }
        ]
    }

    _removeAtKey(key) {
        Alert.alert(
            "Wirklich löschen?",
            "",
            [
                {text: "Nein", onPress: () => {}},
                {text: "Ja", onPress: () => this._wirklichLoeschen(key)}
            ]
        );

    }

    _wirklichLoeschen(key) {
        this.props.store.removeItemByKey(key);
    }

    editItem(index) {
        return [{
            text: 'Bearbeiten',
            backgroundColor: '#00cc00',
            onPress: () => {
                console.log("Editiere Item");
            }
        }]
    }

    renderItem = ({item}) => {
        if(item.type === 'kleidung'){
            return(
                <Swipeout right={this.removeItem(item.key)}>
                    <Kleidung name={item.name} size={item.size} preis={item.preis} bildUrl={item.bildUrl}/>
                </Swipeout>
            )
        }
        else if(item.type === 'spende'){
            return(
                <Swipeout right={this.removeItem(item.key)}>
                    <Spende name={item.name} preis={item.preis} bildUrl={item.bildUrl}/>
                </Swipeout>
            )
        }
        else {
            return (
                <Swipeout right={this.removeItem(item.key)}>
                    <DefaultItem name={item.name} preis={item.preis} bildUrl={item.bildUrl}/>
                </Swipeout>
            )
        }
    }

    _kaufen = () => {
        if (this.props.sum > 500) {
            Alert.alert(
                "Summe übersteigt Limit",
                "Der Kauf kann nicht abgeschlossen werden, da die Gesamtsumme das festgelegte Limit übersteigt",
                [
                    {text: "Verstanden"}
                ]
            );
        } else {
            this.props.store.clear();
            this.props.navigator.push(Router.getRoute('login'));
        }
    };

    render() {
        console.log("ShoppingCartList State");
        console.log(this.props);
        if (this.props.items !== null && this.props.items.length > 0)
        {
            return (
                <View style={styles.container}>
                    <FlatList
                        data={this.props.items}
                        renderItem={this.renderItem}
                        keyExtractor={extractKey} />
                    <TouchableOpacity style={styles.kaufenButton}
                                      onPress={this._kaufen}>
                        <Text style={styles.kaufenText}>Kaufen</Text>
                        <Text style={styles.summe}>{this.props.sum} €</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        else {
            return (
                <View style={styles.leereListeContainer}><Text style={styles.leereListe}>Sie haben noch keine Artikel in Ihrem Warenkorb.</Text></View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
    },
    header: {
        padding: 15,
        marginBottom: 5,
        backgroundColor: '#3498db',
        color: 'white',
        fontWeight: 'bold',
    },
    leereListeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        flex: 1,
    },
    leereListe: {
        fontSize: 16,
        padding: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    kaufenButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#2980b9',
        padding: 20,
    },
    kaufenText: {
        fontSize: 17,
        color: '#FFF',
        flex: 1
    },
    summe: {
        fontSize: 17,
        color: '#FFF',
    },
})