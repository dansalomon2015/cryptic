import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAppSelector } from "@storage";
import { CurrecncyList, Welcome } from "@screens";
import { MainStack } from "./MainStack";

export default () => {
    const firstLaunch = useAppSelector((state) => state.rootReducer.firstLaunch);
    const currenciesSelectionDone = useAppSelector((state) => state.rootReducer.currenciesSelectionDone);

    return (
        <NavigationContainer>
            {firstLaunch ? <Welcome /> : !currenciesSelectionDone ? <CurrecncyList /> : <MainStack />}
        </NavigationContainer>
    );
};
