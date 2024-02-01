import { axiosInstance } from "../config/axiosInstance.js";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get('/cities', async(req, res) => {
    try {
        
        const { data } = await axiosInstance.get('/cities');
        
        return res.status(200).json({ success: true, message: 'Veri getirildi', data });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.get('/cities/:id/districts', async(req, res) => {
    try {
        const { id } = req.params;
        const { data } = await axiosInstance.get(`/cities/${id}/districts`);
        
        return res.status(200).json({ success: true, message: 'Veri getirildi', data });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.get('/districts/:id/neighborhoods', async(req, res) => {
    try {
        const { id } = req.params;
        const { data } = await axiosInstance.get(`/districts/${id}/neighborhoods`);
        
        return res.status(200).json({ success: true, message: 'Veri getirildi', data });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

export default router;
