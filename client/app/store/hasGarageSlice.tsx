import {createSlice} from '@reduxjs/toolkit';
import {AppState} from "./store";
import {HYDRATE} from "next-redux-wrapper";

export interface HasGarageState {
    hasGarageState: Number;
}

const initialState: HasGarageState = {
    hasGarageState: null,
};

export const hasGarageSlice = createSlice({
    name: 'hasGarage',
    initialState,
    reducers: {
        setHasGarageState(state, action) {
            state.hasGarageState = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.hasGarage,
            };
        },
    },
});

export const {setHasGarageState} = hasGarageSlice.actions;

export const selectHasGarageState = (state: AppState) => state.hasGarage.hasGarageState;

export default hasGarageSlice.reducer;

