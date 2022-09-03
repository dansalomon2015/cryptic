import React from "react";
import { StyleSheet, View } from "react-native";
import { Container, Image, TextBold, Button } from "@components";
import I18n from "@locales";
import { Colors, entireScreenWidth, rem, ren } from "@utils";
import Dialog from "react-native-dialog";
import { useDispatch } from "react-redux";
import { updateLaunchStatus } from "@storage";

export const Welcome = () => {
    const [dialogVisible, setDialogVisible] = React.useState(false);
    const dispatch = useDispatch();

    const _continue = () => {
        setDialogVisible(false);
        dispatch(updateLaunchStatus(false));
    };

    return (
        <Container>
            <View style={styles.main}>
                <TextBold fontSize={40} lineHeight={50}>
                    {I18n.t("launcher.follow_market")}
                </TextBold>

                <View style={styles.imageContainer}>
                    <Image source={require("src/assets/images/image_01.png")} style={styles.image} />
                </View>
            </View>
            <View style={styles.btn_container}>
                <Button title={I18n.t("launcher.continue")} onPress={() => setDialogVisible(true)} />
            </View>
            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>{`${I18n.t("launcher.disclaimer")}`}</Dialog.Title>
                <Dialog.Description>{`${I18n.t("launcher.disclaimer_text")}`}</Dialog.Description>
                <Dialog.Button style={{ color: Colors.grey }} label="OK" onPress={_continue} />
            </Dialog.Container>
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
    btn_container: {
        paddingBottom: 40 * ren,
        paddingHorizontal: 30 * rem,
    },
});
