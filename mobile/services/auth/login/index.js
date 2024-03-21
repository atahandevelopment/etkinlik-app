import api from "../../../interceptor";

export const LoginService = async (data) => {
    return await api.post('users/login', data);
}

export const GetMe = async (id) => {
    return await api.get('users/get-me?id=' + id);
};