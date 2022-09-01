import React from "react";
import { StyleSheet, View } from "react-native";
import { Container, Text, Image, TextBold } from "@components";
import I18n from "@locales";
import { Images } from "@assets";
import { entireScreenWidth, rem, ren } from "@utils";

export const Welcome = () => {
    return (
        <Container>
            <View style={styles.main}>
                <TextBold fontSize={40} lineHeight={50}>
                    {I18n.t("launcher.follow_marker")}
                </TextBold>

                <View style={styles.imageContainer}>
                    <Image source={Images.img01} style={styles.image} />
                </View>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal: 20 * rem,
        paddingVertical: 30 * ren,
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30 * ren,
    },
    image: {
        width: entireScreenWidth * 0.8,
        height: undefined,
        aspectRatio: 1 / 1,
    },
});
