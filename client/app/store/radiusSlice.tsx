import {createSlice} from '@reduxjs/toolkit';
import {AppState} from "./store";
import {HYDRATE} from "next-redux-wrapper";

export interface RadiusState {
    radiusState: Number;
}

const initialState: RadiusState = {
    radiusState: null,
};

export const radiusSlice = createSlice({
    name: 'radius',
    initialState,
    reducers: {
        setRadiusState(state, action) {
            state.radiusState = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.radius,
            };
        },
    },
});

export const {setRadiusState} = radiusSlice.actions;

export const selectRadiusState = (state: AppState) => state.radius.radiusState;

export default radiusSlice.reducer;

