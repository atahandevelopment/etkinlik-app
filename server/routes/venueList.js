import { axiosInstance } from "../config/axiosInstance.js";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const { city_ids, district_ids, neighborhood_ids, status_ids, page_size, page } = req.query;
        let pageSize = page_size || 50;
        let venuesUrl = `/venues?take=${pageSize}`;

        if( district_ids ) {
            venuesUrl += `&district_ids=${district_ids}`;
        }
        if( city_ids ) {
            venuesUrl += `&city_ids=${city_ids}`;
        }
        if( neighborhood_ids ) {
            venuesUrl += `&neighborhood_ids=${neighborhood_ids}`;
        }
        if( status_ids ) {
            venuesUrl += `&status_ids=${status_ids}`;
        }
        if( page ) {
            venuesUrl += `&skip=${page}`;
        }
        const { data } = await axiosInstance.get(venuesUrl);
        
        return res.status(200).json({ success: true, message: 'Veri getirildi', data });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.get('/:id', async(req, res) => {
    try {
      const { id }  = req.params;
      const { data } = await axiosInstance.get('/venues/' + id);
     
      return res.status(200).json({ success: true, message: 'Veri getirildi', data });
    
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

export default router;
