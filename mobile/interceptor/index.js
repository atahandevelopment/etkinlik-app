import axios from "axios";
import { PUBLIC_URL } from "@env";

const api = axios.create({
  baseURL: "http://3.65.224.184/api/v1/",
});


export default api;