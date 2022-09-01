import React from "react";
import { TransitionPresets, createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { AppTabRoutes, AppTabRoutesParams } from "./AppTabRoutes";
import { CurrecncyList } from "@screens";

export type MainStackParams = {
    HomeTab: { screen: keyof AppTabRoutesParams };
    CurrencyList: undefined;
};

export type MainStackNavigationProps<T extends keyof MainStackParams> = {
    navigation: StackNavigationProp<MainStackParams, T>;
    route: RouteProp<MainStackParams, T>;
};

const Stack = createStackNavigator<MainStackParams>();

export const MainStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                ...TransitionPresets.SlideFromRightIOS,
            }}
        >
            <Stack.Screen name="HomeTab" component={AppTabRoutes} />
            <Stack.Screen name="CurrencyList" component={CurrecncyList} />
        </Stack.Navigator>
    );
};
