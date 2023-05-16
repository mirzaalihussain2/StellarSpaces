import {createSlice} from '@reduxjs/toolkit';
import {AppState} from "./store";
import {HYDRATE} from "next-redux-wrapper";

export interface IsLogedInState {
    isLogedInState: boolean;
}

const initialState: IsLogedInState = {
    isLogedInState: false,
};

export const isLogedInSlice = createSlice({
    name: 'isLogedIn',
    initialState,
    reducers: {
        setIsLogedInState(state, action) {
            state.isLogedInState = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.isLogedIn,
            };
        },
    },
});

export const {setIsLogedInState} = isLogedInSlice.actions;

export const selectIsLogedInState = (state: AppState) => state.isLogedIn.isLogedInState;

export default isLogedInSlice.reducer;

