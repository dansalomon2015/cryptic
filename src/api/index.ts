import { Currency } from "@utils";
import { baseUrl, GET_ASSETS_PATH } from "./endpoints";
import { GET } from "./requestMethods";
export * from "./endpoints";

export const getAssets = async () => {
    return GET<Currency[]>(GET_ASSETS_PATH);
};
