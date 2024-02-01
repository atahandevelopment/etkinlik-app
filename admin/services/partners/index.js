import api from '@/interceptor';


export const AddPartner = async (data) => {
    return await api.post('/partner/add', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}

export const getPartnersService = async (data) => {
    return await api.get('/partners');
};