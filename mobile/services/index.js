import api from "../interceptor";

export const getEvents = async () => {
    return await api.get("/events?page=1&page_size=50");
}