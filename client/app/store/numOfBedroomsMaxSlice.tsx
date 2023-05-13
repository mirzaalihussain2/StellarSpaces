import {createSlice} from '@reduxjs/toolkit';
import {AppState} from "./store";
import {HYDRATE} from "next-redux-wrapper";


export interface NumOfBedroomsMaxState {
    numOfBedroomsMaxState: Number;
}

const initialState: NumOfBedroomsMaxState = {
    numOfBedroomsMaxState: null,
};

export const numOfBedroomsMaxSlice = createSlice({
    name: 'numOfBedroomsMax',
    initialState,
    reducers: {
        setNumOfBedroomsMaxState(state, action) {
            state.numOfBedroomsMaxState = action.payload;
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

export const { setNumOfBedroomsMaxState} = numOfBedroomsMaxSlice.actions;

export const selectNumOfBedroomsMaxState= (state: AppState) => state.numOfBedroomsMax.numOfBedroomsMaxState;

export default numOfBedroomsMaxSlice.reducer;

