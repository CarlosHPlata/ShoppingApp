import React from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';

const Product = props => {
    return (
        <TouchableWithoutFeedback onPress={props.onSelect}>
            <View style={styles.product}>
                <Image style={styles.image} source={{uri: props.imageUrl}}/>

                <View style={styles.details}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                </View>
                
                <View style={styles.actions}>
                    {props.children}
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 8,
        elevation: 3,
        borderRadius: 10,
        backgroundColor: 'white',
        overflow: 'hidden',
        margin: 20,
    },
    image: {
        height: 180,
        width: '100%',
    },
    title: {
        fontSize: 18,
        marginVertical: 4,
    },
    price: {
        fontSize: 14,
        color: '#888',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    details: {
        alignItems: 'center',
        padding: 10,
    },
});

export default Product