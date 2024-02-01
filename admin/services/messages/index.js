import api from '../../interceptor';

export const GetMessages = async (fullname, email, phone) => {
    let url = `/customer-message`;

    if(fullname) url += `?fullname=${fullname}`;
    if(email) url += `&email=${email}`;
    if(phone) url += `&phone=${phone}`;

    return await api.get(url)
}

export const UpdateMessage = async (id, data) => {
    return await api.put(`/customer-message/${id}`, data);
}