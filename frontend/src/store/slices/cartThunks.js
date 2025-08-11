import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async ({ itemId, size, token, backendUrl }, { rejectWithValue }) => {

    try {
        const response = await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token }});

        return { itemId, size };

    } catch (error) {
        return rejectWithValue(error.message);
    }
  }
);


export const updateCartQuantityAsync = createAsyncThunk(
  "cart/updateCartQuantityAsync",
  async ({ itemId, size, quantity, token, backendUrl }, { rejectWithValue }) => {


    try {
        const response = await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token }});

        return { itemId, size, quantity };

    } catch (error) {
        return rejectWithValue(error.message);
    }
  }
);


export const getUserCartAsync = createAsyncThunk(
    'cart/getUserCartAsync', 
    async ({ token, backendUrl }, { rejectWithValue }) => {
        try {
            const res = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });

            return res.data.cartData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


