import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = props => {
    let TouchableThing = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21){
        TouchableThing = TouchableNativeFeedback;
    }

    return (
        <View style={styles.cartItem}>
            <Text style={styles.itemData}>
                <Text style={styles.mainText}>{props.qty}</Text> <Text style={styles.title}>{props.title}</Text>
            </Text>

            <View style={styles.itemData}>
                <Text style={styles.mainText}>${props.total.toFixed(2)}</Text>

                <View style={styles.buttonContainer}>
                    { props.deletable && <TouchableThing style={styles.deleteButton} onPress={props.onRemove}>
                        <Ionicons name={Platform.OS === 'android'? 'md-trash':'ios-trash'} size={23} color='red'/>
                    </TouchableThing>}
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    cartItem: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mainText: {
        color: '#888',
        fontWeight: 'bold',
        fontSize: 16,
    },
    title: {
        fontSize: 16
    },
    deleteButton: {
        margin: 20,
        backgroundColor: 'blue'
    },
    buttonContainer: {
        marginLeft: 20,
    },
});

export default CartItem