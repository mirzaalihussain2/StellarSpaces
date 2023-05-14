import {createSlice} from '@reduxjs/toolkit';
import {AppState} from "./store";
import {HYDRATE} from "next-redux-wrapper";

export interface PropertyListState {
    propertyListState: [];
}

const initialState: PropertyListState = {
    propertyListState: [],
};

export const propertyListSlice = createSlice({
    name: 'propertyList',
    initialState,
    reducers: {
        setPropertyListState(state, action) {
            state.propertyListState = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.propertyList,
            };
        },
    },
});

export const {setPropertyListState} = propertyListSlice.actions;

export const selectPropertyListState = (state: AppState) => state.propertyList.propertyListState;

export default propertyListSlice.reducer;

