import { Currency } from "@utils";
import { baseUrl, GET_ASSETS_PATH } from "./endpoints";

async function request<T>(url: string): Promise<T> {
    const response = await fetch(baseUrl + url);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}

export const getAssets = async () => request<Currency[]>(GET_ASSETS_PATH);
