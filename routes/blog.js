import express from "express";
import {
  createBlog,
  deleteBlog,
  updateBlog,
  getAllblogs,
  getBlogById,
} from "../controllers/blog.js";
import getMulterUploader from "../middlewares/uploadMiddleware.js";

const router = express.Router();

const uploadImage = getMulterUploader("blogs");

router.get("/", getAllblogs);
router.get("/:id", getBlogById);
router.post("/", uploadImage.single("thumbnail"), createBlog);
router.put("/:id", uploadImage.single("thumbnail"), updateBlog);
router.delete("/:id", deleteBlog);

export default router;
