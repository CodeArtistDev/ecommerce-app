import { useSelector, useDispatch } from 'react-redux';
import { addToCart, updateQuantity, removeFromCart, clearCart } from '../store/slices/cartSlice';
import {
    selectCartItems,
    selectCartCount,
    selectCartAmount,
    selectCurrency,
    selectDeliveryFee
} from '../store/selectors/cartSelectors';
import { useAuth } from './useAuth';
import { addToCartAsync, getUserCartAsync, updateCartQuantityAsync } from '../store/slices/cartThunks';


export const useCart = () => {
    const dispatch = useDispatch();
    const auth = useAuth();
    const token = auth.token;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const cartItems = useSelector(selectCartItems);
    const cartCount = useSelector(selectCartCount);
    const cartAmount = useSelector(selectCartAmount);
    const currency = useSelector(selectCurrency);
    const deliveryFee = useSelector(selectDeliveryFee);

    const handleGetUserCart = () => {
        if(token){
            dispatch(getUserCartAsync({ token, backendUrl }));
        }
        return;
    }

    const handleAddToCart = (itemId, size) => {
         if(token){
            dispatch(addToCartAsync({ itemId, size, token, backendUrl }));
            return;
        }
        dispatch(addToCart({ itemId, size }));
       
    };

    const handleUpdateQuantity = (itemId, size, quantity) => {
         if(token){
            dispatch(updateCartQuantityAsync({ itemId, size, quantity, token, backendUrl }));
            return;
        }
        dispatch(updateQuantity({ itemId, size, quantity }));
       
    };

    const handleRemoveFromCart = (itemId, size) => {
        dispatch(removeFromCart({ itemId, size}));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return {
        cartItems,
        cartCount,
        cartAmount,
        currency,
        deliveryFee,
        getUserCart: handleGetUserCart,
        addToCart: handleAddToCart,
        updateQuantity: handleUpdateQuantity,
        removeFromCart: handleRemoveFromCart,
        clearCart: handleClearCart,
    };

};