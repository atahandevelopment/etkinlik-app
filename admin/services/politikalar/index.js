import api from "@/interceptor";

export const AddPolicie = async (data) => {
  return await api.post("/secure-policies", data);
};

export const GetAllPolicies = async () => {
  return await api.get("/secure-policies");
};

export const UpdatePolicie = async (id, data) => {
  return await api.put(`/secure-policies`, data);
};

export const DeletePolicie = async (id) => {
  return await api.delete(`/secure-policies/${id}`);
};
