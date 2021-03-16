import React from 'react';
import { StyleSheet, View, Text, Image, Button, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../../constants/Colors';
import * as cartActions from '../../store/actions/cart';


const DetailScreen = props => {
    
    const dispatch = useDispatch();
    const productId = props.navigation.getParam('productId');
    const product = useSelector(state => state.products.availableProducts.find(product => product.id === productId));

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: product.imageUrl}}/>

            <View style={styles.action}>
                <Button color={Colors.primary} title="Add to cart" onPress={() => dispatch(cartActions.addToCart(product))}/>
            </View>
            
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <Text style={styles.desc}>{product.description}</Text>
        </ScrollView>
    )
};

DetailScreen.navigationOptions = navData => {
    return {
        title: navData.navigation.getParam('title')
    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
    },
    action: {
        margin: 10,
        alignItems: 'center',
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
    },
    desc: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
    },
});

export default DetailScreen