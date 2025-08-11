import { useNavigate } from 'react-router-dom';
import { useCart } from './useCart';
import { useSearch } from './useSearch';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from './useAuth';
import { fetchProducts } from '../store/slices/productsThunk';



    
    

    const useShop = () => {
    const navigate = useNavigate();
    const cart   = useCart();
    const search = useSearch();
    const auth = useAuth();
    const dispatch = useDispatch();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const products = useSelector(state => state.products.products);
  

 
    useEffect(() => {
        dispatch(fetchProducts({ backendUrl }));
        cart.getUserCart();
    }, [ dispatch, backendUrl ])

    

    return {
        ...cart,

        search: search.searchQuery,
        setSearch: search.setSearch,
        showSearch: search.showSearch,
        setShowSearch: search.setShowSearch,

        navigate,
        token: auth.token,
        setToken: auth.setToken,
        resetToken: auth.resetToken,
        products,
        backendUrl,

        delivery_fee: cart.deliveryFee,
        getCartCount: () => cart.cartCount,
        getCartAmount: () => cart.cartAmount,
    };
};

export default useShop;