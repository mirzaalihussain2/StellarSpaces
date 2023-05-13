import {createSlice} from '@reduxjs/toolkit';
import {AppState} from "./store";
import {HYDRATE} from "next-redux-wrapper";

export interface LocationState {
    locationState: string;
}

const initialState: LocationState = {
    locationState: '',
};

export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocationState(state, action) {
            state.locationState = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.location,
            };
        },
    },
});

export const {setLocationState} = locationSlice.actions;

export const selectLocationState = (state: AppState) => state.location.locationState;

export default locationSlice.reducer;

