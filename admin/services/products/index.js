import api from '@/interceptor';


export const NewProductService = async (data) => {
    return await api.post('/products', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const GetAllProductsService = async (id, title, stock, category, price, brand) => {
    let url = '/products?';
    if (id) url += `id=${id}&`;
    if (title) url += `title=${title}&`;
    if (stock) url += `stock=${stock}&`;
    if (category) url += `category=${category}&`;
    if (price) url += `price=${price}&`;
    if (brand) url += `brand=${brand}&`;
    return await api.get(url);
}

export const UpdateProductById = async (id, data) => {
    return await api.put(`/products/${id}`, data);
};