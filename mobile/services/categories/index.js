import api from "../../interceptor";

export const getFormats = async () => {
    return await api.get(`/format-list`);
}