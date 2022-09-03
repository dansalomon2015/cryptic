import React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { Button, Chips, Container, SearchInput, TextBold, TextMedium } from "@components";
import { getAssets } from "@api";
import { Colors, Currency, FontSize, rem, ren } from "@utils";
import I18n from "@locales";
import { useDispatch } from "react-redux";
import { updateCurrenciesSelectionStatus, useAppSelector } from "@storage";

export const CurrecncyList = () => {
    const dispatch = useDispatch();
    const followed = useAppSelector((state) => state.rootReducer.followedCurrencies);

    const [list, setList] = React.useState<Currency[]>([]);
    const [filteredList, setFilteredList] = React.useState<Currency[]>([]);
    const [searchText, setSearText] = React.useState("");
    const [loading, setLoading] = React.useState(true);

    const _continue = () => dispatch(updateCurrenciesSelectionStatus(true));

    React.useEffect(() => {
        getAssets().then((result) => {
            if (result.code == 200) {
                setLoading(false);
                setList(result.data);
            }
        });
    }, []);

    return (
        <Container>
            <View style={styles.main}>
                <View>
                    <TextBold textAlign="center" fontSize={FontSize.H3}>
                        {I18n.t("currencyList.select_currencies")}
                    </TextBold>
                    <View style={styles.searchContainer}>
                        <SearchInput
                            list={list}
                            searchText={searchText}
                            onSearchResult={setFilteredList}
                            updateSearchText={setSearText}
                        />
                    </View>
                </View>
                {loading && (
                    <View>
                        <ActivityIndicator color={Colors.white} size="large" />
                    </View>
                )}
                {!!searchText.trim() && !filteredList.length && (
                    <TextBold textAlign="center">{I18n.t("currencyList.no_result")}.</TextBold>
                )}
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.list}
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="always"
                >
                    {(!!searchText.trim() ? filteredList : list).map((c, index) => {
                        return <Chips currency={c} key={index} />;
                    })}
                </ScrollView>

                {!!followed.length && (
                    <View style={styles.btn_container}>
                        <Button title={I18n.t("launcher.continue")} onPress={_continue} />
                    </View>
                )}
            </View>
        </Container>
    );
};

export default CurrecncyList;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: 20 * ren,
    },
    list: {
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: 100,
    },
    searchContainer: {
        paddingHorizontal: 16 * rem,
        marginBottom: 20 * ren,
    },
    btn_container: {
        paddingVertical: 20 * ren,
        paddingHorizontal: 30 * rem,
    },
});
