import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productsThunk";


const initialState = {
    products: [],
    loading: false,
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
         .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading= false;
            state.products = action.payload;
         })
         .addCase(fetchProducts.rejected, (state, action) => {
            state.loading= false;
            state.error = action.payload;
         });
         
    },
});

export default productsSlice.reducer;