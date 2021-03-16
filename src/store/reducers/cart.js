import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from '../../models/cartItem';
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
    items: {},
    sum: 0,
};

const onAddToCart = (state, action) => {
    const product = action.product;

    found = state.items[product.id]
    if (found){
        found.setQuantity(found.quantity + 1);
    } else {
        found = new CartItem(1, product.price, product.title);
    }

    return {
        ...state,
        items: {
            ...state.items,
            [product.id]: found
        },
        sum: state.sum + product.price
    };
};

const onRemoveFromCart = (state, action) => {
    const productId = action.productId;
    const found = state.items[productId];
    const updateItems = {...state.items }

    if (found.quantity > 1){
        found.setQuantity(found.quantity - 1);
        updateItems[productId] = found;
    } else {
        delete updateItems[productId];
    }

    return {
        ...state,
        items: updateItems,
        sum: state.sum - found.productPrice
    }
};

const onDeleteProduct = (state, action) => {
    const updateItems = { ...state.items };
    const found = state.items[action.productId];

    if (found){
        delete updateItems[action.productId];
        return {
            ...state,
            items: updateItems,
            sum: state.sum - (found.productPrice * found.quantity)
        }
    }

    return state;
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return onAddToCart(state, action);
        
        case REMOVE_FROM_CART: 
            return onRemoveFromCart(state, action);
        
        case ADD_ORDER:
            return initialState;

        case DELETE_PRODUCT:
            return onDeleteProduct(state, action);
    
        default:
            return state;
    }
    return state;
};