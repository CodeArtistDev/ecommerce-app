import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async({ backendUrl }, { rejectWithValue }) => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if(response.data.success){
                return response.data.products;
            }
            return rejectWithValue(response.data.message || 'Failed to fetch products');
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);