import { createSelector } from '@reduxjs/toolkit';

export const selectCartItems = (state) => state.cart.items;
export const selectCurrency = (state) => state.cart.currency;
export const selectDeliveryFee = (state) => state.cart.deliveryFee;
export const selectProducts = (state) => state.products.products;

export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            for(const size in cartItems[itemId]){
                    const qty = cartItems[itemId][size];
                    if(qty > 0){
                        totalCount += qty;
                    }
            }
        }
        return totalCount;
    }
)

export const selectCartAmount = createSelector(
    [selectCartItems, selectProducts],
    (cartItems, products) => {
        if(!cartItems || !products || !products.length) return 0;

        const productMap = {};
        for(const p of products){
            productMap[p._id] = p;
        }

        let totalAmount = 0;
        for( const itemId in cartItems) {
            let itemInfo = productMap[itemId]
            if(!itemInfo){
                continue;
            }
            for (const size in cartItems[itemId]) {
                    const qty = cartItems[itemId][size];
                    if (qty > 0) {
                        totalAmount += itemInfo.price * qty;
                    }
            }
        }
        return totalAmount;
    }
)