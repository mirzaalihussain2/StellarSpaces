import {createSlice} from '@reduxjs/toolkit';
import {AppState} from "./store";
import {HYDRATE} from "next-redux-wrapper";

export interface PetsAllowedState {
    petsAllowedState: Number;
}

const initialState: PetsAllowedState = {
    petsAllowedState: null,
};

export const petsAllowedSlice = createSlice({
    name: 'petsAllowed',
    initialState,
    reducers: {
        setPetsAllowedState(state, action) {
            state.petsAllowedState = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.petsAllowed,
            };
        },
    },
});

export const {setPetsAllowedState} = petsAllowedSlice.actions;

export const selectPetsAllowedState = (state: AppState) => state.petsAllowed.petsAllowedState;

export default petsAllowedSlice.reducer;

