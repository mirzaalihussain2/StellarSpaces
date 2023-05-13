import {createSlice} from '@reduxjs/toolkit';
import {AppState} from "./store";
import {HYDRATE} from "next-redux-wrapper";

export interface PropertyTypeState {
    propertyTypeState: Number[];
}

const initialState: PropertyTypeState = {
    propertyTypeState: [],
};

export const propertyTypeSlice = createSlice({
    name: 'propertyType',
    initialState,
    reducers: {
        setPropertyTypeState(state, action) {
            state.propertyTypeState = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.propertyType,
            };
        },
    },
});

export const {setPropertyTypeState} = propertyTypeSlice.actions;

export const selectPropertyTypeState = (state: AppState) => state.propertyType.propertyTypeState;

export default propertyTypeSlice.reducer;

