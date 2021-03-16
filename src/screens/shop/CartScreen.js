import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Button, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import CartItem from '../../componets/shop/CartItem';
import Colors from '../../../constants/Colors';
import { removeFromCart } from '../../store/actions/cart';
import { addOrder } from '../../store/actions/orders';

const CartScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const dispatch = useDispatch();

    const total = useSelector(state => state.cart.sum);
    const items = useSelector(state => {
        const transformedItems = [];
        for (const key in state.cart.items){
            transformedItems.push({
                id: key,
                ...state.cart.items[key]
            });
        }

        return transformedItems.sort((a,b) => a.title - b.title);
    });

    const onAddOrderHandler = async () => {
        setIsLoading(true);
        await dispatch(addOrder(items, total));
        setIsLoading(false);
    };

    if (isLoading){
        return (
            <View style={styles.loadingView}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.total}>${total.toFixed(2)}</Text></Text>
                <Button 
                    color={Colors.accent} 
                    title="Order Now" 
                    onPress={onAddOrderHandler} 
                    disabled={items.length === 0}
                />
            </View>

            <FlatList 
                data={items} 
                renderItem={ itemData => (
                    <CartItem 
                        title={itemData.item.productTitle} 
                        qty={itemData.item.quantity} 
                        total={itemData.item.sum} 
                        deletable
                        onRemove={()=>dispatch(removeFromCart(itemData.item.id))}
                    />
                )} 
            />
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
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
    },
    summaryText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    total: {
        color: Colors.primary,
    },
    loadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

CartScreen.navigationOptions = {
    title: 'Your Cart'
};

export default CartScreen