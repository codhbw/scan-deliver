import React, { Component } from 'react'
import { SectionList, Text, StyleSheet } from 'react-native'
import ShoppingCartItem from './ShoppingCartItem'

const sections = [
    {
        id: 0,
        key: 0,
        title: 'Einkaufswagen',
        data: [
            {id: 0, name: 'T-Shirt', preis: '59,99 €', bildUrl: 'https://www.jazzyshirt.de/content/pics/produkte/maenner/basic-t-shirt-zoom.jpg'},
            {id: 1, name: 'Jeans', preis: '34,99 €', bildUrl: 'https://www.jazzyshirt.de/content/pics/produkte/maenner/basic-t-shirt-zoom.jpg'},
            {id: 2, name: 'Stoffhose', preis: '89,99 €', bildUrl: 'https://www.jazzyshirt.de/content/pics/produkte/maenner/basic-t-shirt-zoom.jpg'},
        ]
    },
    {
        id: 1,
        key: 1,
        title: 'Merkliste',
        data: [
            {id: 3, name: 'Bluse', preis: '59,99 €', bildUrl: 'https://www.jazzyshirt.de/content/pics/produkte/maenner/basic-t-shirt-zoom.jpg'},
            {id: 4, name: 'Shirt', preis: '34,99 €', bildUrl: 'https://www.jazzyshirt.de/content/pics/produkte/maenner/basic-t-shirt-zoom.jpg'},
            {id: 5, name: 'Kurze Hose', preis: '89,99 €', bildUrl: 'https://www.jazzyshirt.de/content/pics/produkte/maenner/basic-t-shirt-zoom.jpg'},
        ]
    }
]

const extractKey = ({id}) => id

export default class App extends Component {

    renderItem = ({item}) => {
        return (
            <ShoppingCartItem name={item.name} preis={item.preis} bildUrl={item.bildUrl}/>
        )
    }

    renderSectionHeader = ({section}) => {
        return (
            <Text style={styles.header}>
                {section.title}
            </Text>
        )
    }

    render() {
        return (
            <SectionList
                style={styles.container}
                sections={sections}
                renderItem={this.renderItem}
                renderSectionHeader={this.renderSectionHeader}
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