import api from '../../interceptor';

export const SearchService = async (query, page, pageSize) => {
    return await api.get(`/events?page=${page}&page_size=${pageSize}&name=${query}`)
}