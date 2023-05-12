import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { locationSlice } from "./locationSlice";
import {radiusSlice} from "@/app/store/radiusSlice";
import {numOfBathroomsMaxSlice} from "@/app/store/numOfBathroomsMaxSlice";
import {petsAllowedSlice} from "@/app/store/petsAllowedSlice";
import {priceMaxSlice} from "@/app/store/priceMaxSlice";
import {priceMinSlice} from "@/app/store/priceMinSlice";
import {hasGarageSlice} from "@/app/store/hasGarageSlice";

import {propertyTypeSlice} from "@/app/store/propertyTypeSlice";
import {numOfBathroomsMinSlice} from "@/app/store/numOfBathroomsMinSlice";
import {numOfBedroomsMinSlice} from "@/app/store/numOfBedroomsMinSlice";
import {numOfBedroomsMaxSlice} from "@/app/store/numOfBedroomsMaxSlice";
import{statusSlice} from "@/app/store/statusSlice";

const makeStore = ()=> // bc its a function
    configureStore({
        reducer:{
            [locationSlice.name]:locationSlice.reducer,
            [radiusSlice.name]:radiusSlice.reducer,
            [numOfBathroomsMaxSlice.name]:numOfBathroomsMaxSlice.reducer,
            [numOfBathroomsMinSlice.name]:numOfBathroomsMinSlice.reducer,
            [numOfBedroomsMinSlice.name]:numOfBedroomsMinSlice.reducer,
            [numOfBedroomsMaxSlice.name]:numOfBedroomsMaxSlice.reducer,
            [petsAllowedSlice.name]:petsAllowedSlice.reducer,
            [priceMaxSlice.name]:priceMaxSlice.reducer,
            [priceMinSlice.name]:priceMinSlice.reducer,
            [hasGarageSlice.name]:hasGarageSlice.reducer,
            [statusSlice.name]:statusSlice.reducer,
            [propertyTypeSlice.name]:propertyTypeSlice.reducer,
        },
        devTools : true,
        
    })


export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
    >;

// export const store = createWrapper<AppStore>(makeStore); // ? can u just create a store?
export const store = makeStore();
