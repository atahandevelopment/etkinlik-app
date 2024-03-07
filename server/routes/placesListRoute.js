import { axiosInstance } from "../config/axiosInstance.js";
import express from "express";
import dotenv from "dotenv";
import Cities from "../models/Cities.js";
import Districts from "../models/Districts.js";
import Neighborhoods from "../models/Neighborhoods.js";

dotenv.config();

const router = express.Router();

router.get("/cities", async (req, res) => {
  try {
    const { id, name, slug, limit, page } = req.query;
    const queryParams = [];
    const dataLength = await Cities.countDocuments();
    const queryLimit = limit ? parseInt(limit) : dataLength;
    const skip = page ? (parseInt(page) - 1) * parseInt(queryLimit) : 0;
    let nextPage = null;
    let prevPage = null;
    const total_pages = Math.ceil((await Cities.countDocuments()) / queryLimit);
    const current_page = page ? parseInt(page) : 1;

    if (id) {
      queryParams.push({ _id: id });
    }
    if (name) {
      queryParams.push({ name });
    }
    if (slug) {
      queryParams.push({ slug });
    }

    if (queryParams.length > 0) {
      const data = await Cities.find({ $or: queryParams }).limit(queryLimit).skip(skip);

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
    } else {
      const data = await Cities.find().limit(queryLimit).skip(skip);

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
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/districts", async (req, res) => {
  try {
    const { id, city_id, name, slug } = req.query;
    const queryParams = [];
    if (id) {
      queryParams.push({ _id: id });
    }
    if (name) {
      queryParams.push({ name });
    }
    if (city_id) {
      queryParams.push({ city_id });
    }

    if (queryParams.length > 0) {
      const data = await Districts.find({ $or: queryParams }).populate(
        "city_id"
      );
      return res
        .status(200)
        .json({ success: true, message: "Veri getirildi", data });
    } else {
      const data = await Districts.find().populate("city_id");
      return res
        .status(200)
        .json({ success: true, message: "Veri getirildi", data });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.delete("/districts/all", async (req, res) => {
  try {
    const data = await Districts.deleteMany({});

    return res
      .status(200)
      .json({ success: true, message: "Veri getirildi", data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/neighborhoods", async (req, res) => {
  try {
    const { id, district_id, name, slug } = req.query;
    const queryParams = [];
    if (id) {
      queryParams.push({ _id: id });
    }
    if (name) {
      queryParams.push({ name });
    }
    if (slug) {
      queryParams.push({ slug });
    }
    if (district_id) {
      queryParams.push({ district_id });
    }

    if (queryParams.length > 0) {
      const data = await Neighborhoods.find({
        $or: queryParams,
      }).populate("district_id");

      return res
        .status(200)
        .json({ success: true, message: "Veri getirildi", data });
    } else {
      const data = await Neighborhoods.find().populate("district_id");

      return res
        .status(200)
        .json({ success: true, message: "Veri getirildi", data });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default router;
