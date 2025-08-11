import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './slices/cartSlice';
import searchReducer from './slices/searchSlice';
import authReducer from './slices/authSlice'
import productsReducer from './slices/productsSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        search: searchReducer,
        auth: authReducer,
        products: productsReducer
    },
})

export default store;