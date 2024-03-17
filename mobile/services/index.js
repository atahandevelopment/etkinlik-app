import api from "../interceptor";

export const getEvents = async (page, pageSize) => {
    return await api.get(`events?page=${page}&page_size=${pageSize}`);
}

export const getDetailEvent = async (id) => {
    return await api.get(`events/detail/${id}`);
}