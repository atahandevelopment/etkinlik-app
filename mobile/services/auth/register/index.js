import api from "../../../interceptor";

export const UserRegister = async (data) => {
    return await api.post('users/register', data);
}