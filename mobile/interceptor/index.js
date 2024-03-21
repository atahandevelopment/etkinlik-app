import axios from "axios";
import { PUBLIC_URL } from "@env";

const api = axios.create({
  baseURL: "https://a7cf-176-33-242-250.ngrok-free.app/api/v1/",
});


export default api;