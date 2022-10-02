import React, { useMemo, useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Colors } from "@utils";
import { useWebSocket } from "@hooks";

const screenWidth = Dimensions.get("window").width;
const height = 220;

const Chart = () => {
    const { data } = useWebSocket({});
    const [list, setList] = React.useState<{ [key: string]: string }[]>([]);

    useEffect(() => {
        setList([...list, data].slice(0, 50));
    }, [data]);

    const getData = useMemo(() => {
        let data: number[] = [10000];
        list.forEach((e) => {
            let ob = e;
            if (typeof e === "string") {
                ob = JSON.parse(e);
            }

            console.log(Object.values(ob));

            if (Object.values(ob)[0]) data.push(parseFloat(Object.values(ob)[0]));
        });
        return data;
    }, [list]);
    return (
        <View>
            <LineChart
                data={{
                    labels: Array.from({ length: getData.length }, (_, i) => ""),
                    datasets: [{ data: getData, color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` }],
                }}
                chartConfig={{
                    backgroundColor: "#000000",
                    backgroundGradientFrom: Colors.primary,
                    backgroundGradientTo: Colors.primary,
                    color: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
                }}
                bezier
                width={screenWidth}
                height={height}
                withDots={false}
                yAxisInterval={1000}
            />
        </View>
    );
};

export default Chart;
