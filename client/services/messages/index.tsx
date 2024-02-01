import api from "@/interceptor";
import { PostMessageTypes } from "@/types";

export const PostMessage = async (data: PostMessageTypes) => {
    return await api.post('/customer-message', data)
}