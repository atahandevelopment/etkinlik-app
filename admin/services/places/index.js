import api from '../../interceptor';

export const Cities = async (id, name, slug) => {
    let url = 'places/cities?';
    if(id) url += `id=${id}&`;
    if(name) url += `name=${name}&`;
    if(slug) url += `slug=${slug}&`;
    return await api.get(url);
}

export const Districts = async (id, name, slug, city_id) => {
    let url = "places/districts?";
    if(id) url += `id=${id}&`;
    if(name) url += `name=${name}&`;
    if(slug) url += `slug=${slug}&`;
    if(city_id) url += `city_id=${city_id}&`;
    return await api.get(url);
}

export const Neighborhoods = async (id, name, slug, city_id) => {
    let url = "places/neighborhoods?";
    if(id) url += `id=${id}&`;
    if(name) url += `name=${name}&`;
    if(slug) url += `slug=${slug}&`;
    if(city_id) url += `city_id=${city_id}&`;
    return await api.get(url);
}