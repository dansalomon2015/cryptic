import React, { useMemo } from "react";
import { Pressable, PressableProps, StyleSheet, View } from "react-native";
import { Colors, Currency, FontSize, ren } from "@utils";
import { TextBold } from "@components";
import { followCurrency, unfollowCurrency, useAppSelector } from "@storage";
import { useDispatch } from "react-redux";

interface Props extends PressableProps {
    currency: Currency;
}

export const Chips: React.FC<Props> = ({ currency, ...props }) => {
    const followed = useAppSelector((state) => state.rootReducer.followedCurrencies);
    const dispatch = useDispatch();

    /*
        Check if the current currency is followed by user or not
    */
    const isFollowed = useMemo(() => {
        return !!followed.find((c) => c.id == currency.id);
    }, [followed]);

    const onPress = () => {
        let action = isFollowed ? unfollowCurrency : followCurrency;
        dispatch(action(currency));
    };

    return (
        <Pressable
            onPress={onPress}
            style={[styles.container, { backgroundColor: isFollowed ? Colors.white : Colors.grey }]}
            {...props}
        >
            <TextBold color={isFollowed ? Colors.grey : Colors.white} fontSize={FontSize.normal} lineHeight={30}>
                {currency.name} - {currency.symbol}
            </TextBold>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 2,
        borderColor: Colors.white,
        borderRadius: 100,
        margin: 5 * ren,
    },
});
