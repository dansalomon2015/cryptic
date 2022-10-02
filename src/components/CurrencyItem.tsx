import React, { FC, useEffect, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Colors, Currency, rem, ren } from "@utils";
import { Text, TextMedium } from "@components";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useWebSocket } from "@hooks";

const CurrencyItem: FC<{ currency: Currency }> = ({ currency }) => {
    const { data } = useWebSocket({ currencyId: currency.id });
    const [state, setState] = useState({
        value: 0,
        prevValue: 0,
    });

    const getRatio = useMemo(() => {
        return ((Math.abs(state.prevValue - state.value) * 100) / state.prevValue).toFixed(4);
    }, [state]);

    const hasIncrease = useMemo(() => {
        return state.value > state.prevValue;
    }, [state]);

    const { symbol, name } = currency;

    useEffect(() => {
        let ob = data;
        if (typeof data === "string") {
            ob = JSON.parse(data);
        }

        setState({
            value: parseFloat(ob[currency.id]),
            prevValue: state.value,
        });
    }, [data]);

    return (
        <View style={styles.container}>
            <View style={styles.names_container}>
                <View style={styles.circle}>
                    <Text>{symbol}</Text>
                </View>
                <TextMedium ml={10 * rem}>{name}</TextMedium>
            </View>
            <View>
                <TextMedium fontSize={16 * rem} textAlign={"right"}>
                    ${state.value}
                </TextMedium>
                <View style={styles.value_container}>
                    <ArrowIcon increase={hasIncrease} />
                    <Text color={hasIncrease ? Colors.green : Colors.red} textAlign={"right"}>
                        {getRatio} %
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.grey,
        padding: 10 * rem,
        borderRadius: 20,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10 * ren,
    },
    names_container: {
        flexDirection: "row",
        alignItems: "center",
    },
    circle: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary,
        borderRadius: 100,
        width: 45 * rem,
        height: 45 * rem,
    },
    value_container: {
        justifyContent: "flex-end",
        flexDirection: "row",
        alignItems: "center",
    },
});

export default CurrencyItem;

const ArrowIcon: FC<{ increase: boolean }> = ({ increase }) => {
    return (
        <Icon name={increase ? "menu-up" : "menu-down"} color={increase ? Colors.green : Colors.red} size={24 * rem} />
    );
};
