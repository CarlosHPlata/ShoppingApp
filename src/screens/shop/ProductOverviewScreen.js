import React, {useEffect, useState, useCallback} from 'react';
import { StyleSheet, View, FlatList, Button, Platform, Text, ActivityIndicator} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Product from '../../componets/shop/Product';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import CustomHeaderButton from '../../componets/ui/CustomHeaderButton';
import Colors from '../../../constants/Colors';

const ProductOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [errorData, setErrorData] = useState(undefined);
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch();

    const loadFn = useCallback( async () => {
        setErrorData(null);
        setIsRefreshing(true);
        try {
            await dispatch(productActions.fetchProducts());
        } catch (e) {
            setErrorData(e.message);
        }
        setIsRefreshing(false);
    }, dispatch, setIsLoading, setErrorData);

    useEffect(() => {
        setIsLoading(true);
        loadFn().then(() => {
            setIsLoading(false);
        });
    }, [loadFn]);

    useEffect(() => {
        const willFocusSubscription = props.navigation.addListener('willFocus',loadFn);

        return () => {
            willFocusSubscription.remove();
        };
    }, [loadFn]);

    const goToProductDetail = product => {
        props.navigation.navigate('ProductDetaills', {productId: product.id, title: product.title});
    }

    if (errorData) {
        return (<View style={styles.loadingView}>
            <Text>Something went wrong</Text>
            <Button title='Try again' onPress={loadFn} color={Colors.primary} />
        </View>)
    }

    if (isLoading) {
        return (
            <View style={styles.loadingView}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }

    if (!isLoading && products.length == 0){
        return (
            <View style={styles.loadingView}>
                <Text>No produucts found</Text>
            </View>
        );
    }

    return (
        <FlatList 
            onRefresh={loadFn}
            refreshing={isRefreshing}
            data={products} 
            renderItem={itemData => (
                <Product 
                    title={itemData.item.title} 
                    price={itemData.item.price} 
                    imageUrl={itemData.item.imageUrl} 
                    onSelect={() => goToProductDetail(itemData.item)} 
                >
                    <Button color={Colors.primary} title="View Details" onPress={() => goToProductDetail(itemData.item)} />
                    <Button color={Colors.accent} title="Add To Cart" onPress={()=>dispatch(cartActions.addToCart(itemData.item))} />
                </Product>
            )} 
        />
    )
};

ProductOverviewScreen.navigationOptions = navData => ({
    title: 'All Products',
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
            <Item title="Menu" iconName={Platform.OS === 'android'? 'md-menu' : 'ios-menu'} onPress={()=>navData.navigation.toggleDrawer()} />
        </HeaderButtons>
    ),
    headerRight: () => (<HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
        <Item title='Cart' iconName={Platform.OS === 'android'? 'md-cart' : 'ios-cart'} onPress={()=>navData.navigation.navigate('Cart')} />
    </HeaderButtons>)
});

const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ProductOverviewScreen