import Product from '../../models/product';

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

const PRODUCTS_URL = 'https://rn-complete-guide-eb357-default-rtdb.firebaseio.com/products.json';

export const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch(PRODUCTS_URL);

            if (!response.ok){
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            const loadedProducts = [];
    
            for (let key in resData){
                loadedProducts.push(
                    new Product(
                        key,
                        'u1',
                        resData[key].title,
                        resData[key].imageUrl,
                        resData[key].description,
                        resData[key].price    
                    )
                );
            }
    
            dispatch({ type: SET_PRODUCTS, products: loadedProducts });
        } catch (e) {
            throw err;
        }
    };
};

export const deleteProduct = productId => async dispatch => {
    const response = await fetch(`https://rn-complete-guide-eb357-default-rtdb.firebaseio.com/products/${productId}.json`, {method: 'DELETE'});

    if (!response.ok){
        throw new Error('Something went wrong');
    }

    dispatch({
        type: DELETE_PRODUCT,
        productId
    });
};

export const editProduct = (id, title, description, imageUrl) => {
    return async dispatch => {
        const edittedProduct = {
            title,
            description,
            imageUrl
         };
    
        const response = await fetch(`https://rn-complete-guide-eb357-default-rtdb.firebaseio.com/products/${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application.json'
            },
            body: JSON.stringify(edittedProduct),
        });

        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        dispatch ({
            type: EDIT_PRODUCT,
            productData: {
                id,
                title,
                description,
                imageUrl
             }
        });
    };
};

export const addProduct = (title, description, imageUrl, price) => {
    return async dispatch => {
        const priceNum = parseFloat(price);
        const newProduct = {
            title,
            description,
            imageUrl,
            price: priceNum
         };
        // execute any async code you want!
        const response = await fetch(PRODUCTS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application.json'
            },
            body: JSON.stringify(newProduct),
        });

        const resData = await response.json();
        
        dispatch({
            type: ADD_PRODUCT,
            productData: {
                id: resData.name,
                title,
                description,
                imageUrl,
                price: priceNum
            }
       });
    }
    
};