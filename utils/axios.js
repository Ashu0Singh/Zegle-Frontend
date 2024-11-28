import axios from "axios";
import {
    NEXT_PUBLIC_SERVER_URL,
    NEXT_PUBLIC_CLIENT_URL as URL,
} from "../config.js";

const baseURL = NEXT_PUBLIC_SERVER_URL;

const axiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": `${URL}`,
    },
    withCredentials: true,
});

export default axiosInstance;
