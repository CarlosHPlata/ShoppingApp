import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import DetailScreen from '../screens/shop/DetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

import Colors from '../../constants/Colors';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS == 'android' && Platform.Version >=21? Colors.primary : '',
    },
    headerTintColor: Platform.OS == 'android' && Platform.Version >=21? 'white' : Colors.primary,
};

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductOverviewScreen,
    ProductDetaills: DetailScreen,
    Cart: CartScreen,
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android'? 'md-cart':'ios-cart'} size={23} color={drawerConfig.tintColor}/>
    },
    defaultNavigationOptions: defaultNavOptions
});

const OrdersStackNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android'? 'md-list':'ios-list'} size={23} color={drawerConfig.tintColor}/>
    },
    defaultNavigationOptions: defaultNavOptions
});

const AdminStackNavigator = createStackNavigator({
    UserProducts: UserProductScreen,
    EditProduct: EditProductScreen,
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android'? 'md-create':'ios-create'} size={23} color={drawerConfig.tintColor}/>
    },
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS == 'android' && Platform.Version >=21? Colors.accent : '',
        },
        headerTintColor: Platform.OS == 'android' && Platform.Version >=21? 'white' : Colors.accent,
    }
});


const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersStackNavigator,
    Admin: AdminStackNavigator,
},{
    contentOptions: {
        activeTintColor: Colors.primary
    }
});

export default createAppContainer(ShopNavigator);