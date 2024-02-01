// import { axiosInstance } from "../config/axiosInstance.js";
import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const { query } = req.query;
        const { data } = await axios.get('https://etkinlik.io/api/search?query=' + query);
        const { results } = data;
        
        return res.status(200).json({ success: true, message: 'Veri getirildi', results });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

export default router;
