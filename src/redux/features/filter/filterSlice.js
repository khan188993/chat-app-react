/* eslint-disable */
//this eslint disable for state error showing on params
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'all',
    colors: [],
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        // changeStatus('completed')
        changeStatus: (state, action) => {
            state.status = action.payload;
        },
        changeColor: (state, action) => {
            const isExistColor = state.colors.includes(action.payload);
            if (isExistColor) {
                state.colors = state.colors.filter((color) => color !== action.payload);
            } else {
                state.colors.push(action.payload);
            }
        },
    },
});

export default filterSlice.reducer;
export const { changeStatus, changeColor } = filterSlice.actions;
