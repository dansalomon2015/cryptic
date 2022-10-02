import React, { FC } from "react";
import { Container, TextBold, TextMedium } from "@components";
import { View, Text, StyleSheet } from "react-native";
import { Colors, FontSize, rem } from "@utils";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CurrencyItem from "src/components/CurrencyItem";
import { useAppSelector } from "@storage";
import { AppTabNavigationProps } from "src/navigation/AppTabRoutes";

type Props = AppTabNavigationProps<"Prices">;

export const Prices: FC<Props> = ({ navigation }) => {
    const followed = useAppSelector((state) => state.rootReducer.followedCurrencies);
    return (
        <Container>
            <View style={{ flex: 1, padding: 16 }}>
                <View style={styles.header}>
                    <View>
                        <TextBold fontSize={FontSize.H3}>Cryptic</TextBold>
                    </View>
                    <Icon
                        name="format-align-right"
                        color={Colors.white}
                        size={24 * rem}
                        onPress={() => navigation.navigate("CurrencyList")}
                    />
                </View>

                <TextMedium fontSize={FontSize.H4} mt={20} mb={10}>
                    Wishlist
                </TextMedium>
                {followed.map((c, i) => (
                    <CurrencyItem key={i} currency={c} />
                ))}
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});

export default Prices;
