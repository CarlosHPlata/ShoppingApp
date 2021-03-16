import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from'redux-thunk';

import productsReducer from './src/store/reducers/products';
import cartReducer from './src/store/reducers/cart';
import ordersReducer from './src/store/reducers/orders';

import ShopNavigator from './src/navigation/ShopNavigator';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store} >
      <ShopNavigator />
    </Provider>
  );
}