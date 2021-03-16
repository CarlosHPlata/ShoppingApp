import React, {useState} from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import CartItem from './CartItem';
import Colors from '../../../constants/Colors';

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.total.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            {
                showDetails && <View>
                    {props.items.map(item => <CartItem key={item.id} title={item.productTitle} qty={item.quantity} total={item.sum} />)}
                </View>
            }

            <Button title={showDetails? "Hide Details" : "Show Details"} onPress={()=>{setShowDetails(prev => !prev)}} color={Colors.primary} />
        </View>
    )
};

const styles = StyleSheet.create({
    orderItem: {
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
        padding: 10,
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    totalAmount: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    date: {
        fontSize: 16,
        color: '#888',
    },
});

export default OrderItem