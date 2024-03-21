import api from "../../interceptor";

export const Cities = async () => {
    return await api.get('places/cities')
}