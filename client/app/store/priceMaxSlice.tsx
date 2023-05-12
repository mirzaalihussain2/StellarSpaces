import {createSlice} from '@reduxjs/toolkit';
import {AppState} from "./store";
import {HYDRATE} from "next-redux-wrapper";

export interface PriceMaxState {
    priceMaxState: Number;
}

const initialState: PriceMaxState = {
    priceMaxState: null,
};

export const priceMaxSlice = createSlice({
    name: 'priceMax',
    initialState,
    reducers: {
        setPriceMaxState(state, action) {
            state.priceMaxState = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.priceMax,
            };
        },
    },
});

export const {setPriceMaxState} = priceMaxSlice.actions;

export const selectPriceMaxState = (state: AppState) => state.priceMax.priceMaxState;

export default priceMaxSlice.reducer;

