import React from "react";
import { wsUrl } from "@api";
import { useAppSelector } from "@storage";

type Props = {};

export const useWebSocket = ({}: Props) => {
    const followed = useAppSelector((state) => state.rootReducer.followedCurrencies);
    const [data, setData] = React.useState<{ [k: string]: string }>({});

    // @ts-ignore
    React.useEffect(() => {
        if (!followed.length) return;

        const markets = followed.reduce((acc, curr) => {
            acc += curr.id + ",";
            return acc;
        }, "");

        const ws = new WebSocket(wsUrl + markets);

        console.log(wsUrl + markets);

        ws.onopen = () => {
            console.log("socket open");
        };

        ws.onclose = () => {
            console.log("socket closed");
        };

        ws.onmessage = (event) => {
            setData(event.data);
        };

        return () => ws.close();
    }, [followed]);

    return { data };
};
