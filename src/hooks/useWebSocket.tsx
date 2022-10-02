import React from "react";
import { wsUrl } from "@api";
import { useAppSelector } from "@storage";

type Props = { currencyId?: string };

export const useWebSocket = ({ currencyId }: Props) => {
    const followed = useAppSelector((state) => state.rootReducer.followedCurrencies);
    const [data, setData] = React.useState<{ [k: string]: string }>({});

    // @ts-ignore
    React.useEffect(() => {
        if (!followed.length) return;

        const markets = followed.reduce((acc, curr) => {
            acc += curr.id + ",";
            return acc;
        }, "");

        let ws = new WebSocket(wsUrl + markets);

        if (currencyId) ws = new WebSocket(wsUrl + currencyId);

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
