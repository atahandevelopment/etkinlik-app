import api from "@/interceptor";

export const RegisterService = async (data) => {
  return await api.post("/user/register", data);
};

export const LoginService = async (data) => {
  return await api.post("/user/login", data);
};

export const GetMe = async (id) => {
  return await api.get("/user/get-me?id=" + id);
};
