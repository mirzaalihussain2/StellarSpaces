
import { createSlice } from '@reduxjs/toolkit';

const initialLocationState = {
    location: '',
};

const locationSlice = createSlice({
    name: 'location',
    initialState: initialLocationState,
    reducers: {
        updateLocation(state, action) {
            state.postcode = action.payload;
        },
    },
});

export const { updateLocation} = locationSlice.actions;

export default locationSlice.reducer;

