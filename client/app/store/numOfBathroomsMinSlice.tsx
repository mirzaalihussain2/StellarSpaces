import {createSlice} from '@reduxjs/toolkit';
import {AppState} from "./store";
import {HYDRATE} from "next-redux-wrapper";


export interface NumOfBathroomsMinState {
    numOfBathroomsMinState: Number;
}

const initialState: NumOfBathroomsMinState = {
    numOfBathroomsMinState: null,
};

export const numOfBathroomsMinSlice = createSlice({
    name: 'numOfBathroomsMin',
    initialState,
    reducers: {
        setNumOfBathroomsMinState(state, action) {
            state.numOfBathroomsMinState = action.payload;
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

export const { setNumOfBathroomsMinState} = numOfBathroomsMinSlice.actions;

export const selectNumOfBathroomsMinState= (state: AppState) => state.numOfBathroomsMin.numOfBathroomsMinState;

export default numOfBathroomsMinSlice.reducer;

