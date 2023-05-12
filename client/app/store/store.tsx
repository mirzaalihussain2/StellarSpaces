import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { locationSlice } from "./locationSlice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = ()=> // bc its a function
    configureStore({
        reducer:{
            [locationSlice.name]:locationSlice.reducer,
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
