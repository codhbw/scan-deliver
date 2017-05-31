/**
 * Created by Surface Book on 30.05.2017.
 */
import React from 'react';
import {
    Picker,
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
import ModalDropdown from 'react-native-modal-dropdown';

import Layout from '../constants/Layout';

export default class ShoppingCartItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {size: "-"};
    }

    render() {
        if(this.props.type === 'clothing'){
            return (
                <TouchableNativeFeedback
                    fallback={TouchableHighlight}
                    underlayColor="#ccc"
                    style={styles.container}>
                    <View style={styles.logoContainer}>
                        <FadeIn placeholderStyle={{backgroundColor: Platform.OS === 'android' ? 'transparent' : '#eee'}}>
                            <Image
                                resizeMode="contain"
                                source={{uri: this.props.bildUrl }}
                                style={styles.logo}
                            />
                        </FadeIn>
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>
                            {this.props.name}
                        </Text>

                        <Text style={styles.price}>
                            {this.props.preis}
                        </Text>
                    </View>

                    <View>
                        <ModalDropdown
                            style={styles.dropdown}
                            options={['-', 'xs', 's', 'm', 'l', 'xl', 'xxl']}
                            defaultValue={this.props.size}/>
                    </View>

                    <View style={styles.buttonContainer}>
                        <MaterialIcons name="chevron-right" size={30} color="#b8c3c9" />
                    </View>
                </TouchableNativeFeedback>
            );
        }
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
    dropdown: {
        width: 40,
        height: 40,
        marginTop: 5,
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