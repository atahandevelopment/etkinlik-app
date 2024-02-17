import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const apiUrl = "http://localhost:5000/api/v1";

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    //   "Authorization": "Bearer " + accessToken,
    "Content-Type": "application/json",
  },
});

export default api;
