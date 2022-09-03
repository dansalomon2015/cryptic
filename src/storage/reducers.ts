import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Currency, RootStateType } from "@utils";

const initialState: RootStateType = {
    followedCurrencies: [],
    currentCurrency: undefined,
    firstLaunch: true,
    currenciesSelectionDone: false,
};

const appSlice = createSlice({
    name: "rootReducer",
    initialState,
    reducers: {
        updateCurrenciesSelectionStatus: (state, action: PayloadAction<boolean>) => {
            state.currenciesSelectionDone = action.payload;
        },
        updateLaunchStatus: (state, action: PayloadAction<boolean>) => {
            state.firstLaunch = action.payload;
        },
        followCurrency: (state, action: PayloadAction<Currency>) => {
            state.followedCurrencies.push(action.payload);
        },
        unfollowCurrency: (state, action: PayloadAction<Currency>) => {
            state.followedCurrencies = state.followedCurrencies.filter((c) => !(c.id == action.payload.id));
        },
    },
});

export default appSlice;
