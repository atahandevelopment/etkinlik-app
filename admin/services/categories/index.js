import api from "@/interceptor";

export const addCategoryService = async (data) => {
    return await api.post('/categories', data)
}

export const getCategories = async (queries) => {
    return await api.get("/categories");
}

export const getAllCategories = async (id) => {
    let url = "/categories";

    if(id) {
        url += '?parent=' + id;
    }
    return await api.get(url);
}

export const UpdateCategory = async (id,data) => {
    return await api.put(`/categories/${id}`, data)
}

export const DeleteCategory = async (id) => {
    return await api.delete(`/categories/${id}`);
}