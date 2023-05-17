import {createSlice} from '@reduxjs/toolkit';
import {AppState} from "./store";
import {HYDRATE} from "next-redux-wrapper";

export interface TokenState {
    propertyCardSelectedState: Number;
}

const initialState: TokenState = {
    propertyCardSelectedState: null,
};

export const propertyCardSelectedSlice = createSlice({
    name: 'propertyCardSelected',
    initialState,
    reducers: {
        setPropertyCardSelectedState(state, action) {
            state.propertyCardSelectedState = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.propertyCardSelected,
            };
        },
    },
});

export const {setPropertyCardSelectedState} = propertyCardSelectedSlice.actions;

export const selectPropertyCardSelectedState = (state: AppState) => state.propertyCardSelected.propertyCardSelectedState;

export default propertyCardSelectedSlice.reducer;

