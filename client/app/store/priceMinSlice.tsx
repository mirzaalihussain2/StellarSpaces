import {createSlice} from '@reduxjs/toolkit';
import {AppState} from "./store";
import {HYDRATE} from "next-redux-wrapper";

export interface PriceMinState {
    priceMinState: Number;
}

const initialState: PriceMinState = {
    priceMinState: null,
};

export const priceMinSlice = createSlice({
    name: 'priceMin',
    initialState,
    reducers: {
        setPriceMinState(state, action) {
            state.priceMinState = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.priceMin,
            };
        },
    },
});

export const {setPriceMinState} = priceMinSlice.actions;

export const selectPriceMinState = (state: AppState) => state.priceMin.priceMinState;

export default priceMinSlice.reducer;

