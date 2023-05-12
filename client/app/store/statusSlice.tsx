import {createSlice} from '@reduxjs/toolkit';
import {AppState} from "./store";
import {HYDRATE} from "next-redux-wrapper";

export interface StatusState {
    statusState: Number[];
}

const initialState: StatusState = {
    statusState: [],
};

export const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        setStatusState(state, action) {
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

export const {setStatusState} = statusSlice.actions;

export const selectStatusState = (state: AppState) => state.status.statusState;

export default statusSlice.reducer;

