import React, { Component } from 'react'
import { FlatList, Text, StyleSheet, AsyncStorage } from 'react-native'
import ShoppingCartItem from './ShoppingCartItem'

const rows = [
    {id: 0, type: 'clothing', name: 'T-Shirt', size: 'm', preis: '59,99 €', bildUrl: 'https://www.jazzyshirt.de/content/pics/produkte/maenner/basic-t-shirt-zoom.jpg'},
    {id: 1, type: 'clothing', name: 'Jeans', size: 'm', preis: '34,99 €', bildUrl: 'https://www.jazzyshirt.de/content/pics/produkte/maenner/basic-t-shirt-zoom.jpg'},
    {id: 2, type: 'clothing', name: 'Stoffhose', size: 'm', preis: '89,99 €', bildUrl: 'https://www.jazzyshirt.de/content/pics/produkte/maenner/basic-t-shirt-zoom.jpg'},
    {id: 3, type: 'clothing', name: 'Bluse', size: 'm', preis: '59,99 €', bildUrl: 'https://www.jazzyshirt.de/content/pics/produkte/maenner/basic-t-shirt-zoom.jpg'},
    {id: 4, type: 'clothing', name: 'Shirt', size: 'm', preis: '34,99 €', bildUrl: 'https://www.jazzyshirt.de/content/pics/produkte/maenner/basic-t-shirt-zoom.jpg'},
    {id: 5, type: 'clothing', name: 'Kurze Hose', size: 'm', preis: '89,99 €', bildUrl: 'https://www.jazzyshirt.de/content/pics/produkte/maenner/basic-t-shirt-zoom.jpg'},
]

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

const extractKey = ({id}) => id

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    renderItem = ({item}) => {
        return (
            <ShoppingCartItem type={item.type} name={item.name} preis={item.preis} bildUrl={item["bild-url"]} key={item.key}/>
        )
    }

    render() {
        console.log("ShoppingCartList Props");
        console.log(this.props);
        return (
            <FlatList
                style={styles.container}
                data={this.props.rows}
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