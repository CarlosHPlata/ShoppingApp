import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Platform, ActivityIndicator, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../componets/ui/CustomHeaderButton';
import OrderItem from '../../componets/shop/OrderItem'
import * as orderActions from '../../store/actions/orders';
import Colors from '../../../constants/Colors';


const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false);

    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();


    useEffect(() => {
        setIsLoading(true)
        dispatch(orderActions.fetchOrders())
        .then(() => { setIsLoading(false) });
    }, [dispatch, setIsLoading]);

    if (isLoading) {
        return (
            <View style={styles.loadingView}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }

    return (
        <FlatList 
            data={orders} 
            renderItem={ itemData => (
                <OrderItem total={itemData.item.totalAmount} date={itemData.item.getReadableDate()} items={itemData.item.items} />
            )} 
        />
    )
};

OrdersScreen.navigationOptions = navData => ({
    title: 'Your Orders',
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
            <Item title="Menu" iconName={Platform.OS === 'android'? 'md-menu' : 'ios-menu'} onPress={()=>navData.navigation.toggleDrawer()} />
        </HeaderButtons>
    )
});

const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default OrdersScreen