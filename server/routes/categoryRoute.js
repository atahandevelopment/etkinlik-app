import express from "express";
import dotenv from "dotenv";
import Categories from "../models/Categories.js";
import { redisClient } from "../config/redis.js";

dotenv.config();

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { page, limit } = req.query;
    const cacheKey = `categories:${page}_${limit}`;
    const cachedData = await redisClient.get(cacheKey)
console.log("dada",JSON.parse(cachedData))

  if (cachedData !== null) { // Eğer cache'te veri varsa, onu döndürelim
    return res.status(200).json(JSON.parse(cachedData));
  }

    const dataLength = await Categories.countDocuments();
    const queryLimit = limit ? parseInt(limit) : dataLength;
    const skip = page ? (parseInt(page) - 1) * parseInt(queryLimit) : 0;
    let nextPage = null;
    let prevPage = null;
    const total_pages = Math.ceil(
      (await Categories.countDocuments()) / queryLimit
    );
    const current_page = page ? parseInt(page) : 1;

    const data = await Categories.find().limit(queryLimit).skip(skip);

    if (total_pages > current_page) {
      nextPage = current_page + 1;
    } else {
      nextPage = null;
    }

    if (current_page - 1 > 0) {
      prevPage = current_page - 1;
    } else {
      prevPage = null;
    }

    await redisClient.set(cacheKey, JSON.stringify({
      success: true,
      message: "Veri getirildi",
      current_page,
      next_page: nextPage,
      prev_page: prevPage,
      count: data?.length,
      total_pages,
      total_count: dataLength,
      data,
    }));

    return res.status(200).json({
      success: true,
      message: "Veri getirildi",
      current_page,
      next_page: nextPage,
      prev_page: prevPage,
      count: data?.length,
      total_pages,
      total_count: dataLength,
      data,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Categories.findOne({ id });

    return res
      .status(200)
      .json({ success: true, message: "Veri getirildi", data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default router;
