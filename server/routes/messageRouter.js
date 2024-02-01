import express from "express";
import Messages from "../models/Messages.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const messageData = req.body;
    const createMessage = await Messages.create(messageData);
    return res.status(201).json({ success: true, data: createMessage });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { fullname, phone, email, is_read } = req.query;
    const filters = [];
    if (fullname) {
      filters.push({ fullname: fullname });
    }
    if (phone) {
      filters.push({ phone: phone });
    }
    if (email) {
      filters.push({ email: email });
    }
    if (is_read) {
      filters.push({ is_read: is_read });
    }
    if (filters.length > 0) {
      const messages = await Messages.find({ $or: filters });
      return res.status(200).json({ success: true, data: messages });
    } else {
      const messages = await Messages.find();
      return res.status(200).json({ success: true, data: messages });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedData = await Messages.findByIdAndUpdate({ _id: id }, data, { new: true});
    console.log("nedir", updatedData)
    return res.status(200).json({ success: true, message: "Mesaj güncelleme başarılı", data: updatedData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Messages.findByIdAndDelete({ _id: id });

    return response
      .status(200)
      .json({ message: "Mesaj silme başarılı!", data: response });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
