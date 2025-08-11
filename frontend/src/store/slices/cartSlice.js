import { createSlice } from "@reduxjs/toolkit";
import { addToCartAsync, getUserCartAsync, updateCartQuantityAsync } from "./cartThunks";

const initialState = {
  items: {},
  currency: "$",
  deliveryFee: 10,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { itemId, size } = action.payload;

      if (state.items[itemId]) {
        if (state.items[itemId][size]) {
          state.items[itemId][size] += 1;
        } else {
          state.items[itemId][size] = 1;
        }
      } else {
        state.items[itemId] = {};
        state.items[itemId][size] = 1;
      }
    },

    updateQuantity: (state, action) => {
      const { itemId, size, quantity } = action.payload;

      if (state.items[itemId] && state.items[itemId][size] !== undefined) {
        state.items[itemId][size] = quantity;
      }
    },

    removeFromCart: (state, action) => {
      const { itemId, size } = action.payload;

      if (state.items[itemId] && state.items[itemId][size]) {
        delete state.items[itemId][size];

        if (Object.keys(state.items[itemId]).length === 0) {
          delete state.items[itemId];
        }
      }
    },

    clearCart: (state) => {
      state.items = {};
    },
  },
  extraReducers: (builder) => {

    //Add to cart sync
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        const { itemId, size } = action.payload;

        if (state.items[itemId]) {
          if (state.items[itemId][size]) {
            state.items[itemId][size] += 1;
          } else {
            state.items[itemId][size] = 1;
          }
        } else {
          state.items[itemId] = {};
          state.items[itemId][size] = 1;
        }
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
      });


    //Update quantity async
    builder
      .addCase(updateCartQuantityAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartQuantityAsync.fulfilled, (state, action) => {
        const { itemId, size, quantity } = action.payload;
        if(state.items[itemId] && state.items[itemId][size] !== undefined){
          state.items[itemId][size] = quantity;
        }
        state.loading = false;
      })
      .addCase(updateCartQuantityAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      //Get user cart async

      builder
        .addCase(getUserCartAsync.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getUserCartAsync.fulfilled, (state, action) => {
          state.items = action.payload || {};
          state.loading = false;
        })
        .addCase(getUserCartAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
