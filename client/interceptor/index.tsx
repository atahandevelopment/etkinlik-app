import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const apiUrl = process.env.NODE_API_URL;

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    //   "Authorization": "Bearer " + accessToken,
    "Content-Type": "application/json",
  },
});

export default api;
