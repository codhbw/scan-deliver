import React, { Component } from 'react'
import { FlatList, Text, StyleSheet, AsyncStorage, View, TouchableOpacity, Platform } from 'react-native'
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
        console.log(this.props.rows.length);
        console.log("Constructor von Shoppingcart called");
        this.state = {
            items: this.props.rows,
            summe: 0
        };
        console.log("PROPS____");
        console.log(props);
        console.log("STATE_____");
        console.log(this.state);
    }

    componentWillReceiveProps(nextProps) {
        console.log("NEXT PROPS COMING");
        console.log(nextProps);
        this.setState({items: nextProps.rows});
        nextProps.rows.forEach((row) => {
            let alteSumme = (this.state.summe == null || this.state.summe == undefined) ? 0 : this.state.summe
            let neueSumme = parseFloat(parseFloat(alteSumme) + parseFloat(row.preis));
            this.setState({summe: neueSumme});
        });
    }

    removeItem(index) {
        return [{
            text: 'Löschen',
            backgroundColor: '#cc0000',
            onPress: () => {
                console.log("LÖSCHE INDEX = " + index);
                this._removeAtKey(index);
            }
        }]
    }

    _removeAtKey(key) {
        console.log("REMOVE AT KEY:");
        console.log(key);
        var deleteIndex = null;
        var itemToDelete = null;
        let items = this.state.items;
        console.log("ITEMS:::");
        console.log(items);
        for (let i = 0; i < items.length; i++) {
            let itemAtIndex = items[i];
            console.log("Ist " + key + " = " + itemAtIndex.key + "?");
            if (itemAtIndex.key == key) {
                deleteIndex = i;
                itemToDelete = itemAtIndex;
            }
        }

        console.log("deleteIndex:");
        console.log(deleteIndex);

        if (deleteIndex !== null) {
            items.splice(deleteIndex, 1);
        }

        //this._save(items);
        this.setState({items: items});
        let alteSumme = (this.state.summe == null || this.state.summe == undefined) ? 0 : this.state.summe
        let neueSumme = parseFloat(parseFloat(alteSumme) - parseFloat(itemToDelete.preis));
        this.setState({summe: neueSumme});
    }

    _save = async (items) => {
        try {
            console.log("ShoppingCartList - Save");
            if (items == null) {
                console.log("ShoppingCartList - Items = Null");
                items = [];
            }
            console.log("ShoppingCartList: Saving object into 'items': " + JSON.stringify(items));
            await AsyncStorage.setItem("items", JSON.stringify(items));
        } catch (error) {
            console.log("ShoppingCartList Error: " + error);
        }
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
            <DefaultItem name={item.name} preis={item.preis} bildUrl={item.bildUrl}/>
        }
    }

    _kaufen = () => {
        this.props.navigator.push(Router.getRoute('login'));
    };

    render() {
        console.log("ShoppingCartList State");
        console.log(this.state);
        if (this.state.items !== null && this.state.items.length > 0)
        {
            return (
                <View style={styles.container}>
                    <FlatList
                        data={this.state.items}
                        renderItem={this.renderItem}
                        keyExtractor={extractKey} />
                    <TouchableOpacity style={styles.kaufenButton}
                                      onPress={this._kaufen}>
                        <Text style={styles.kaufenText}>Kaufen</Text>
                        <Text style={styles.summe}>{this.state.summe} €</Text>
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