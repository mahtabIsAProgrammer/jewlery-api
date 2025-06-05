import express from "express";
import getMulterUploader from "../middlewares/uploadMiddleware.js";

const router = express.Router();

const uploadImage = getMulterUploader();

router.post("/", uploadImage.single(""), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const imageUrl = `/data/${req.file.filename}`;
  res.status(201).json({ imageUrl });
});

export default router;
