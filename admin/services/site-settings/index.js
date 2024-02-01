import api from "@/interceptor";


export const getSiteSettings = async () => {
    return await api.get("/site-settings");
}