import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Currency, RootStateType } from "@utils";

const initialState: RootStateType = {
    followedCurrencies: [],
    currentCurrency: undefined,
    firstLaunch: true,
};

const appSlice = createSlice({
    name: "rootReducer",
    initialState,
    reducers: {
        updateLaunchStatus: (state, action: PayloadAction<boolean>) => {
            state.firstLaunch = action.payload;
        },
        followCurrency: (state, action: PayloadAction<Currency>) => {
            state.followedCurrencies.push(action.payload);
        },
    },
});

export default appSlice;
