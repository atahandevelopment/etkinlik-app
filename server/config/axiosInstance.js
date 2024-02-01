import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.ETKINLIK_API_SECRET,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Etkinlik-Token': process.env.EVENT_APP_ACCESS_TOKEN
    }
});