import api from "@/interceptor";

export const AddExperiences = async (data) => {
    return await api.post('/experiences', data);
}

export const GetExperiences = async () => {
    return await api.post('/experiences');
}

export const UpdateExperience = async (id, data) => {
    return await api.post(`/experiences/${id}`, data);
}

export const DeleteExperience = async (id) => {
    return await api.delete(`/experiences/${id}`);
}