import React from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import FadeIn from '@expo/react-native-fade-in-image';
import TouchableNativeFeedback from '@expo/react-native-touchable-native-feedback-safe';
import { MaterialIcons } from '@expo/vector-icons';

import Layout from '../constants/Layout';

export default class Spende extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableNativeFeedback
                fallback={TouchableHighlight}
                underlayColor="#ccc"
                style={styles.container}>
                <View style={styles.logoContainer}>
                    <FadeIn placeholderStyle={{backgroundColor: Platform.OS === 'android' ? 'transparent' : '#eee'}}>
                        <Image
                            resizeMode="contain"
                            source={this.props.bildUrl}
                            style={styles.logo}
                        />
                    </FadeIn>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.name}>
                        {this.props.name}
                    </Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.price}>
                        {this.props.preis}
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <MaterialIcons name="chevron-right" size={30} color="#b8c3c9" />
                </View>
            </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomColor: '#e5e5e5',
        borderBottomWidth: Platform.OS === 'android' ? 1 : StyleSheet.hairlineWidth,
        width: Layout.window.width,
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingLeft: 10
    },
    sizeContainer: {
        paddingLeft: 10
    },
    name: {
        fontSize: 16,
    },
    price: {
        fontSize: 12,
    },
    logoContainer: {
        padding: 15,
    },
    logo: {
        width: 60,
        height: 60,
    },
    buttonContainer: {
        paddingRight: 5,
    },
});