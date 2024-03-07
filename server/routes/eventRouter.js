import express from "express";
import dotenv from "dotenv";
import Events from "../Models/Events.js";
import { redisClient } from "../config/redis.js";

dotenv.config();

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const {
      page_size,
      page,
      start_date,
      end_date,
      id,
      slug,
      name,
      category_id,
      category_name,
      venue_id,
      city,
      district,
      format_id,
    } = req.query;

    const pageNumber = parseInt(page) || 1;
    const pageSize = page_size || 50;

    let cacheKey = `events:${pageNumber}_${pageSize}`;
    if (start_date) cacheKey += `_${start_date}`;
    if (end_date) cacheKey += `_${end_date}`;
    if (id) cacheKey += `_${id}`;
    if (slug) cacheKey += `_${slug}`;
    if (name) cacheKey += `_${name}`;
    if (category_id) cacheKey += `_${category_id}`;
    if (category_name) cacheKey += `_${category_name}`;
    if (venue_id) cacheKey += `_${venue_id}`;
    if (format_id) cacheKey += `_${format_id}`;
    if (city) cacheKey += `_${city}`;
    if (district) cacheKey += `_${district}`;

    const totalCount = await Events.countDocuments({});
    const cachedData = await redisClient.get(cacheKey);
    // console.log(JSON.parse(cachedData));

   if (cachedData !== null) { // Eğer cache'te veri varsa, onu döndürelim
    return res.status(200).json(JSON.parse(cachedData));
  }

    if (
      start_date ||
      end_date ||
      id ||
      slug ||
      name ||
      category_id ||
      category_name ||
      venue_id ||
      format_id ||
      city ||
      district
    ) {
      const results = await Events.find({
        $or: [
          { id: id },
          { slug: slug },
          { name: name },
          { "category.id": category_id },
          { "category.name": category_name },
          { "venue.id": venue_id },
          { "venue.city.id": city },
          { "venue.district.id": district },
          { "format.id": format_id },
        ],
      })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);

      const count = results.length;

      await redisClient.set(
        cacheKey,
        JSON.stringify({
          success: true,
          message: `Veri getirildi`,
          current_page: pageNumber,
          total_count: totalCount,
          pageSize: count,
          results,
        })
      );

      return res.status(200).json({
        success: true,
        message: `Veri getirildi`,
        current_page: pageNumber,
        total_count: totalCount,
        pageSize: count,
        results,
      });
    } else {
      const results = await Events.find()
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);
      const count = results.length;

      await redisClient.set(
        cacheKey,
        JSON.stringify({
          success: true,
          message: `Cache Verisi getirildi`,
          current_page: pageNumber,
          total_count: totalCount,
          pageSize: count,
          results,
        })
      );

      return res.status(200).json({
        success: true,
        message: `Cache Verisi getirildi`,
        current_page: pageNumber,
        total_count: totalCount,
        pageSize: count,
        results,
      });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/detail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Events.findOne({ id: id });

    return res
      .status(200)
      .json({ success: true, message: "Veri getirildi", data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default router;
