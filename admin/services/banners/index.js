import api from '@/interceptor';

export const AddBanner = async (data) => {
    return await api.post('/banners/add-banner', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

}

export const getBannersService = async (id, title, is_active) => {
    let url = `/banners`;
    if(id) url += `?id=${id}`;
    if(title) url += `&title=${title}`;
    if(is_active) url += `&is_active=${is_active}`;
    return await api.get(url);
};

export const UpdateBannerInfo = async (id, data) => {
    return await api.put(`/banners/${id}`, data);
};

export const DeleteBanner = async (id) => {
    return await api.delete(`/banners/${id}`);
}