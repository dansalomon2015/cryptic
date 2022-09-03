import React, { useCallback, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, ViewProps } from "react-native";
import { Colors, Currency, FontFamily, ren } from "@utils";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import i18n from "@locales";

interface Props extends ViewProps {
    list: Currency[];
    searchText: string;
    updateSearchText: (value: string) => void;
    onSearchResult: (result: Currency[]) => void;
}

export const SearchInput: React.FC<Props> = ({ list, searchText, updateSearchText, onSearchResult, ...props }) => {
    const onSearch = useCallback(() => {
        if (!searchText.trim()) return [];
        const regex = new RegExp(`${searchText.trim()}`, "i");

        onSearchResult(
            list.filter((item) => (item.name || "").search(regex) >= 0 || (item.symbol || "").search(regex) >= 0)
        );
    }, [searchText]);

    useEffect(() => {
        onSearch();
    }, [searchText]);

    return (
        <View style={styles.main} {...props}>
            <Icon name="magnify" size={24} />
            <TextInput
                value={searchText}
                placeholder={i18n.t("currencyList.search")}
                style={styles.textInput}
                selectionColor={Colors.grey}
                placeholderTextColor={Colors.grey}
                onChangeText={updateSearchText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        paddingVertical: 2 * ren,
        paddingHorizontal: 10,
        borderRadius: 100,
        backgroundColor: Colors.white,
        marginTop: 20 * ren,
        flexDirection: "row",
        alignItems: "center",
    },
    textInput: {
        color: Colors.primary,
        fontFamily: FontFamily.Regular,
        fontSize: 14,
        flex: 1,
    },
});
