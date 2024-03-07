import axios from "axios";
// import { PUBLIC_URL } from "@env";

const api = axios.create({
  baseURL: "http://172.21.208.1:5000/api/v1",
});


export default api;