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
    const data = await Cities.find();

    return res
      .status(200)
      .json({ success: true, message: "Veri getirildi", data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/cities/districts", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Districts.find().populate("city_id");

    return res
      .status(200)
      .json({ success: true, message: "Veri getirildi", data });
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
    const { id, district_id } = req.query;
    const queryParams = [];
    if (id) {
      queryParams.push({ _id: id });
    }
    if (district_id) {
      queryParams.push({ district_id });
    }

    if(queryParams.length > 0) {
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
