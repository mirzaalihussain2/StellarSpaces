import {createSlice} from '@reduxjs/toolkit';
import {AppState} from "./store";
import {HYDRATE} from "next-redux-wrapper";

export interface TokenState {
    tokenState: Number;
}

const initialState: TokenState = {
    tokenState: null,
};

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setTokenState(state, action) {
            state.tokenState = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.token,
            };
        },
    },
});

export const {setTokenState} = tokenSlice.actions;

export const selectTokenState = (state: AppState) => state.token.tokenState;

export default tokenSlice.reducer;

