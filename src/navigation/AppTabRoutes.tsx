import React from "react";
import { RouteProp } from "@react-navigation/native";
import { Platform, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, TextBold } from "@components";
import { Colors, FontSize, IPHONE12_H, IPHONE12_Max, entireScreenHeight as D_HEIGHT, IPHONE12_Mini, rem } from "@utils";
import { Prices, Settings, VolumeScreen } from "@screens";
import { MainStackNavigationProps } from "./MainStack";

export type AppTabRoutesParams = {
    Prices: undefined;
    Volumes: undefined;
    Settings: undefined;
};

export type AppTabNavigationProps<T extends keyof AppTabRoutesParams> = {
    navigation: BottomTabNavigationProp<AppTabRoutesParams, T>;
    route: RouteProp<AppTabRoutesParams, T>;
} & MainStackNavigationProps<"HomeTab">;

const Tab = createBottomTabNavigator<AppTabRoutesParams>();

const getText = (focused: boolean, text: string) => {
    if (focused) return <TextBold fontSize={FontSize.small}>{text}</TextBold>;
    return (
        <Text fontSize={FontSize.normal} color={Colors.grey} lineHeight={14}>
            {text}
        </Text>
    );
};

export const AppTabRoutes = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    alignItems: "center",
                    backgroundColor: Colors.primary_transparent,
                    height:
                        Platform.OS === "ios" &&
                        (D_HEIGHT === IPHONE12_H || D_HEIGHT === IPHONE12_Max || D_HEIGHT === IPHONE12_Mini)
                            ? 80
                            : 56 * rem,
                },
                headerShown: false,
            }}
        >
            <Tab.Screen
                name={"Prices"}
                component={Prices}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={styles.icon_container}>
                                <Icon size={24 * rem} name="chart-box" color={focused ? Colors.white : Colors.grey} />
                                {getText(focused, "Prices (USD)")}
                            </View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name={"Volumes"}
                component={VolumeScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={styles.icon_container}>
                                <Icon
                                    size={24 * rem}
                                    name="home-analytics"
                                    color={focused ? Colors.white : Colors.grey}
                                />
                                {getText(focused, "Market")}
                            </View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name={"Settings"}
                component={Settings}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={styles.icon_container}>
                                <Icon size={24 * rem} name="cog" color={focused ? Colors.white : Colors.grey} />
                                {getText(focused, "Market")}
                            </View>
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    icon_container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
