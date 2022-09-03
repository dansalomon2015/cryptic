import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Container, Text } from "@components";
import { useWebSocket } from "@hooks";
import { useEffect } from "react";

export const Prices = () => {
    const { data } = useWebSocket({});
    const [list, setList] = React.useState<{ [key: string]: string }[]>([]);

    useEffect(() => {
        setList([...list, data]);
    }, [data]);

    return (
        <Container>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={list}
                    renderItem={({ item, index }) => {
                        return <Text key={index}>{JSON.stringify(item)}</Text>;
                    }}
                    scrollEnabled
                    style={{ flex: 1 }}
                />
            </View>
        </Container>
    );
};

export default Prices;

const styles = StyleSheet.create({});
