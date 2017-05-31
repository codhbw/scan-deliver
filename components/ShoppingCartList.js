import React, { Component } from 'react'
import { FlatList, Text, StyleSheet, AsyncStorage, View, TouchableOpacity, Platform } from 'react-native'
import Kleidung from './Kleidung'
import Spende from './Spende'
import Swipeout from 'react-native-swipeout';
import { withNavigation } from '@expo/ex-navigation';
import Router from '../navigation/Router'

const rows = [
    {id: 0, type: 'kleidung', name: 'T-Shirt', size: 'Größe m', preis: '59,99 €', bildUrl: 'https://www.jazzyshirt.de/content/pics/produkte/maenner/basic-t-shirt-zoom.jpg'},
    {id: 1, type: 'kleidung', name: 'Jeans', size: 'Größe m', preis: '34,99 €', bildUrl: 'https://www.jazzyshirt.de/content/pics/produkte/maenner/basic-t-shirt-zoom.jpg'},
    {id: 2, type: 'kleidung', name: 'Stoffhose', size: 'Größe m', preis: '89,99 €', bildUrl: 'https://www.jazzyshirt.de/content/pics/produkte/maenner/basic-t-shirt-zoom.jpg'},
    {id: 3, type: 'kleidung', name: 'Bluse', size: 'Größe m', preis: '59,99 €', bildUrl: 'https://www.jazzyshirt.de/content/pics/produkte/maenner/basic-t-shirt-zoom.jpg'},
    {id: 4, type: 'kleidung', name: 'Shirt', size: 'Größe m', preis: '34,99 €', bildUrl: 'https://www.jazzyshirt.de/content/pics/produkte/maenner/basic-t-shirt-zoom.jpg'},
    {id: 5, type: 'kleidung', name: 'Kurze Hose', size: 'Größe m', preis: '89,99 €', bildUrl: 'https://www.jazzyshirt.de/content/pics/produkte/maenner/basic-t-shirt-zoom.jpg'},
    {id: 6, type: 'spende', name: 'Brot für die Welt', preis: '20 €', bildUrl: 'http://www.fairworldfonds.de/assets/beteiligte/2015_brot.png'},
    {id: 7, type: 'spende', name: 'Ärzte ohne Grenzen', preis: '10 €', bildUrl: 'https://ssl.aerzte-ohne-grenzen.de/img/logos/msf_germany_logo.png'},
]
/*
async function saveItems(allitems){
    await AsyncStorage.setItem('@store:items', JSON.stringify(allitems));
}

async function loadItems(){
    const items = await AsyncStorage.getItem('@store:items');
    return items;
}

try {
    saveItems(rows);
} catch (error) {
    // Error saving data
}

try {
    const items = loadItems();
    if (items !== null){
        // We have data!!
        console.log('success');
        console.log(items)
    }
} catch (error) {
    // Error retrieving data
}
*/

const extractKey = ({key}) => key

@withNavigation
export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: this.props.rows
        };
        console.log("PROPS____");
        console.log(props);
        console.log("STATE_____");
        console.log(this.state);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({items: nextProps.rows});
    }

    blah(index) {
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
        let items = this.state.items;
        console.log("ITEMS:::");
        console.log(items);
        for (let i = 0; i < items.length; i++) {
            let itemAtIndex = items[i];
            console.log("Ist " + key + " = " + itemAtIndex.key + "?");
            if (itemAtIndex.key == key) {
                deleteIndex = i;
            }
        }

        console.log("deleteIndex:");
        console.log(deleteIndex);

        if (deleteIndex !== null) {
            items.splice(deleteIndex, 1);
        }

        this._save(items);
        this.setState({items: items});
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
                <Swipeout right={this.blah(item.key)}>
                    <Kleidung name={item.name} size={item.size} preis={item.preis} bildUrl={item.bildUrl}/>
                </Swipeout>
            )
        }
        if(item.type === 'spende'){
            return(
                <Swipeout right={this.blah(item.key)}>
                    <Spende name={item.name} preis={item.preis} bildUrl={item.bildUrl}/>
                </Swipeout>
            )
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
                        data={this.state.rows}
                        renderItem={this.renderItem}
                        keyExtractor={extractKey} />
                    <TouchableOpacity style={styles.kaufenButton}
                                      onPress={this._kaufen}>
                        <Text style={styles.kaufenText}>Kaufen</Text>
                        <Text style={styles.summe}>382,98 €</Text>
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