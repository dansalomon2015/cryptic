import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAppSelector } from "@storage";
import { CurrecncyList, Welcome } from "@screens";
import { MainStack } from "./MainStack";

export default () => {
    const firstLaunch = useAppSelector((state) => state.rootReducer.firstLaunch);
    const followed = useAppSelector((state) => state.rootReducer.followedCurrencies);

    return (
        <NavigationContainer>
            {firstLaunch ? <Welcome /> : !followed.length ? <CurrecncyList /> : <MainStack />}
        </NavigationContainer>
    );
};
