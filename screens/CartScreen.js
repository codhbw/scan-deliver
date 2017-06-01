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
    AsyncStorage,
    StatusBar
} from 'react-native';
import ShoppingCartList from '../components/ShoppingCartList';

export default class CartScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  };

  state = {
      items: []
  }

  constructor(props) {
      super(props);
      console.log("Created CartScreen");

      this.state = {
          items : [],
          summe: 0
      };
  }

    onItemChange() {
        console.log("CartScreen: ON ITEM CHANGE");
        let storeState = this.props.store.getState();
        this.setState({summe: storeState.sum, items: storeState.items});
    }

    componentWillMount() {
        console.log("CartScreen - ComponentWillMount:");
        this.props.store.subscribeForItemChange("CartScreen", () => this.onItemChange())
    }

    componentDidMount() {
        console.log("CartScreen: ComponentDidMount");
        this.props.store.subscribeForItemChange("CartScreen", () => this.onItemChange());
    }

    componentWillUpdate() {
        console.log("CartScreen: ComponentWillUpdate");
        if (!this.props.store.isSubscribed("CartScreen")) {
            console.log("CartScreen - Registering Subscriber");
            this.props.store.subscribeForItemChange("CartScreen", () => this.onItemChange());
        } else {
            console.log("Cart Screen is already subscribed");
        }
    }

    render() {
        console.log("HELLO I AM RENDERING CARTSCREEN, MY STATE IS FOLLOWING");
        console.log(this.state);
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content"/>
                <ShoppingCartList items={this.state.items} sum={this.state.summe} store={this.props.store} />
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