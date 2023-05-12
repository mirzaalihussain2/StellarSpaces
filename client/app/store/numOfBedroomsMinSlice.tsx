import {createSlice} from '@reduxjs/toolkit';
import {AppState} from "./store";
import {HYDRATE} from "next-redux-wrapper";


export interface NumOfBedroomsMinState {
    numOfBedroomsMinState: Number;
}

const initialState: NumOfBedroomsMinState = {
    numOfBedroomsMinState: null,
};

export const numOfBedroomsMinSlice = createSlice({
    name: 'numOfBedroomsMin',
    initialState,
    reducers: {
        setNumOfBedroomsMinState(state, action) {
            state.numOfBedroomsMinState = action.payload;
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

export const { setNumOfBedroomsMinState} = numOfBedroomsMinSlice.actions;

export const selectNumOfBedroomsMinState= (state: AppState) => state.numOfBedroomsMin.numOfBedroomsMinState;

export default numOfBedroomsMinSlice.reducer;

