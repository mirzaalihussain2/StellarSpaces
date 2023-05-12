import {createSlice} from '@reduxjs/toolkit';
import {AppState} from "./store";
import {HYDRATE} from "next-redux-wrapper";

export interface NumOfBathroomsMaxState {
    numOfBathroomsMaxState: Number;
}

const initialState: NumOfBathroomsMaxState = {
    numOfBathroomsMaxState: null,
};

export const numOfBathroomsMaxSlice = createSlice({
    name: 'numOfBathroomsMax',
    initialState,
    reducers: {
        setNumOfBathroomsMaxState(state, action) {
            state.numOfBathroomsMaxState = action.payload;
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

export const { setNumOfBathroomsMaxState} = numOfBathroomsMaxSlice.actions;

export const selectNumOfBathroomsMaxState = (state: AppState) => state.numOfBathroomsMax.numOfBathroomsMaxState;

export default numOfBathroomsMaxSlice.reducer;

