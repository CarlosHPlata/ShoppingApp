import PRODUCTS from '../../../data/dummy-data';
import Product from '../../models/product';
import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, SET_PRODUCTS } from '../actions/products';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(p => p.ownerId == 'u1'),
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                availableProducts: action.products,
                userProducts: action.products.filter(p => p.ownerId == 'u1')
            }
        case DELETE_PRODUCT:
            return onDeleteProduct(state, action);
        case ADD_PRODUCT:
            return onAddProduct(state, action);
        case EDIT_PRODUCT:
            return onEditProduct(state, action);
    }
    
    return state;
};

const onDeleteProduct = (state, action) => {
    return {
        ...state,
        availableProducts: state.availableProducts.filter(p => p.id !== action.productId),
        userProducts: state.userProducts.filter(p => p.id !== action.productId),
    }
};

const onAddProduct = (state, action) => {
    const productData = action.productData;
    const newProduct = new Product(productData.id, 'u1', productData.title, productData.imageUrl, productData.description, productData.price);

    return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
    }
};

const onEditProduct = (state, action) => {
    
    console.log('se supone que estoy entrando aqui ccigada madre', action.productData.title)
    const productData = action.productData;
    const productIndex = state.userProducts.findIndex(p => p.id === productData.id);
    const product = state.userProducts[productIndex];
    const updatedProduct = new Product(product.id, product.ownerId, productData.title, productData.imageUrl, productData.description, product.price);

    const updatedUserProducts = [...state.userProducts];
    updatedUserProducts[productIndex] = updatedProduct;

    const availableProductsIndex = state.availableProducts.findIndex(p => p.id === productData.id);
    const updatedAvailableProducts = [...state.availableProducts];
    updatedAvailableProducts[availableProductsIndex] = updatedProduct;

    return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
    }
};