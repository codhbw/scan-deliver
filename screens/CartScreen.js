import React from 'react';
import {
    Image,
    Linking,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    AsyncStorage
} from 'react-native';
import ShoppingCartList from '../components/ShoppingCartList';

import { MonoText } from '../components/StyledText';

export default class CartScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  };

  constructor(props) {
      super(props);
      console.log("Created CartScreen");
      this.state = {
          items : []
      }
  }

    _loadData = async () => {
        try {
            console.log("CartScreen: Getting Storage");
            const value = await AsyncStorage.getItem("items");
            if (value != null) {
                let parsed = JSON.parse(value);
                console.log("CartScreen: Value from AsyncStorage = " + value);

                // Nur setState verwenden, wenn sich die Anzahl der Items geändert hat
                // (sonst gibt es eine Endlos-Schleife von Update-Zyklen
                if (this.state.items.length != parsed.length) {
                    this.setState({items: JSON.parse(value)});
                }
            };
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    componentWillMount() {
        this._loadData();
    }

    componentWillUpdate() {
        this._loadData();
    }

    render() {
        console.log("CartScreen::Render: Rows:");
        console.log(this.state.items);
        return (
            <View style={styles.container}>
                <ShoppingCartList rows={this.state.items} />
                <TouchableOpacity style={styles.kaufenButton}
                    onPress={this._registrieren}>
                    <Text style={styles.kaufenText}>Kaufen</Text>
                    <Text style={styles.summe}>382,98 €</Text>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 15,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 80,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 140,
        height: 38,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 23,
        textAlign: 'center',
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
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});