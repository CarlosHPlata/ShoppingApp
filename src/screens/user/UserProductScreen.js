import React from 'react';
import { StyleSheet, FlatList, Button, Platform, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../componets/ui/CustomHeaderButton';
import Product from '../../componets/shop/Product';
import Colors from '../../../constants/Colors';
import { deleteProduct } from '../../store/actions/products';

const UserProductScreen = props => {
    const dispatch = useDispatch();
    const userProducts = useSelector(state => state.products.userProducts)

    const goToEditProduct = productId => {
        props.navigation.navigate('EditProduct', {productId});
    };

    const deleteHandler = id => {
        Alert.alert('Are you sure?', 'Are your sure you want to delete the item?', [
            {text: 'No', style: 'default'}, 
            {text: 'Yes', style: 'destructive', onPress: () => dispatch(deleteProduct(id)) }
        ]);
    };

    return (
        <FlatList data={userProducts} renderItem={itemData => ( 
            <Product 
                title={itemData.item.title} 
                price={itemData.item.price} 
                imageUrl={itemData.item.imageUrl} 
                onSelect={()=>goToEditProduct(itemData.item.id)}
            >
                <Button color={Colors.primary} title="Edit" onPress={()=>goToEditProduct(itemData.item.id)} />
                <Button color={Colors.accent} title="Delete" onPress={()=>{deleteHandler(itemData.item.id)}} />
            </Product>
        )}/>
    )
};

const styles = StyleSheet.create({

});

UserProductScreen.navigationOptions = navData => ({
    title: 'My Products Added',
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
            <Item title="Menu" iconName={Platform.OS === 'android'? 'md-menu' : 'ios-menu'} onPress={()=>navData.navigation.toggleDrawer()} />
        </HeaderButtons>
    ),
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
            <Item title="Add" iconName={Platform.OS === 'android'? 'md-add' : 'ios-add'} onPress={()=>navData.navigation.navigate('EditProduct')} />
        </HeaderButtons>
    )
});

export default UserProductScreen