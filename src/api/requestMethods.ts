import axios, { AxiosResponse } from "axios";
import { baseUrl } from "./endpoints";

export const http = axios.create({
    baseURL: baseUrl,
});

http.interceptors.response.use(
    function (response: AxiosResponse<{ data: any }, any>) {
        return {
            code: 200,
            data: response.data.data,
        };
    },
    function (error) {
        try {
            return {
                code: error.response.status,
                message: error.response.data.message,
            };
        } catch (er) {
            return {
                code: 1001,
                message: error,
            };
        }
    }
);

export const urlFormatter = (url: string, params?: any) => {
    let url_formatted = url;
    if (params) {
        if (Object.keys(params).length) {
            url_formatted = params ? url + "?" : url;
            for (var key in params) {
                url_formatted += `${key}=${params[key]}&`;
            }
        }
    }
    return url_formatted;
};

export const GET = async <T>(url: string, params?: any): Promise<{ code: number; message: string; data: T }> => {
    let url_params = urlFormatter(url, params);
    return http.get(url_params);
};
