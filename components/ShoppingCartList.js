import React, { Component } from 'react'
import { FlatList, Text, StyleSheet, AsyncStorage } from 'react-native'
import Kleidung from './Kleidung'
import Spende from './Spende'
import DefaultItem from "./DefaultItem";

const rows = [
    {id: 0, type: 'kleidung', name: 'T-Shirt', size: 'Größe m', preis: '59,99 €', imgResource: {uri:'https://www.jazzyshirt.de/content/pics/produkte/maenner/basic-t-shirt-zoom.jpg'}},
    {id: 1, type: 'kleidung', name: 'Jeans', size: 'Größe m', preis: '34,99 €', imgResource: {uri:'https://www.jazzyshirt.de/content/pics/produkte/maenner/basic-t-shirt-zoom.jpg'}},
    {id: 2, type: 'kleidung', name: 'Stoffhose', size: 'Größe m', preis: '89,99 €', imgResource: {uri:'https://www.jazzyshirt.de/content/pics/produkte/maenner/basic-t-shirt-zoom.jpg'}},
    {id: 3, type: 'kleidung', name: 'Bluse', size: 'Größe m', preis: '59,99 €', imgResource: {uri:'https://www.jazzyshirt.de/content/pics/produkte/maenner/basic-t-shirt-zoom.jpg'}},
    {id: 4, type: 'kleidung', name: 'Shirt', size: 'Größe m', preis: '34,99 €', imgResource: {uri:'https://www.jazzyshirt.de/content/pics/produkte/maenner/basic-t-shirt-zoom.jpg'}},
    {id: 5, type: 'kleidung', name: 'Kurze Hose', size: 'Größe m', preis: '89,99 €', imgResource: {uri:'https://www.jazzyshirt.de/content/pics/produkte/maenner/basic-t-shirt-zoom.jpg'}},
    {id: 6, type: 'spende', name: 'Brot für die Welt', preis: '20 €', imgResource: require('../assets/images/brotfuerdiewelt.png')},
    {id: 7, type: 'spende', name: 'Ärzte ohne Grenzen', preis: '10 €', imgResource: require('../assets/images/aerzteohnegrenzen.png')},
    {id: 8, type: 'moebel', name: 'Lederstuhl', preis: '180 €', imgResource: require('../assets/images/stuhl.jpg')},
    {id: 9, type: 'kissen', name: 'Gelbes Kissen', preis: '15 €', imgResource: require('../assets/images/kissen.jpg')},
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

const extractKey = ({id}) => id

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    renderItem = ({item}) => {
        if(item.type === 'kleidung'){
            return(
                <Kleidung name={item.name} size={item.size} preis={item.preis} imgResource={item.imgResource}/>
            )
        }
        else if(item.type === 'spende'){
            return(
                <Spende name={item.name} preis={item.preis} imgResource={item.imgResource}/>
            )
        }
        else {
            <DefaultItem name={item.name} preis={item.preis} imgResource={item.imgResource}/>
        }
    }

    render() {
        console.log("ShoppingCartList Props");
        console.log(this.props);
        return (
            <FlatList
                style={styles.container}
                data={rows}
                renderItem={this.renderItem}
                keyExtractor={extractKey}
            />
        );
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
})