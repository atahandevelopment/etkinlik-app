import { axiosInstance } from "../config/axiosInstance.js";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        
        const { data } = await axiosInstance.get('/formats');
        
        return res.status(200).json({ success: true, message: 'Veri getirildi', data });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

export default router;
