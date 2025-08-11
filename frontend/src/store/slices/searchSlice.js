import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    query: '',
    showSearch: false,
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.query = action.payload;
        },
        setShowSearch: (state, action) => {
            state.showSearch = action.payload;
        },
        toggleSearch: (state) => {
            state.showSearch = !state.showSearch;
        },
        clearSearch: (state) => {
            state.query = '';
            state.showSearch = false;
        },
    },
});

export const { setSearch, setShowSearch, toggleSearch, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;