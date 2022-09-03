import React from "react";
import { View, TouchableOpacity, StyleSheet, ViewProps, ViewStyle, TextStyle } from "react-native";
import { Colors, FontSize, ren } from "@utils";
import { Text, TextMedium } from "@components";

interface Props extends ViewProps {
    title?: string;
    onPress?: () => void;
    buttonStyle?: ViewStyle;
    titleStyle?: TextStyle;
}

export const Button: React.FC<Props> = ({ title, onPress, buttonStyle, titleStyle }) => {
    return (
        <TouchableOpacity activeOpacity={0.6} style={[styles.button, buttonStyle]} onPress={onPress}>
            <TextMedium style={titleStyle} color={Colors.grey} fontSize={FontSize.H3}>
                {title}
            </TextMedium>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.white,
        paddingVertical: 10 * ren,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
    },
});
