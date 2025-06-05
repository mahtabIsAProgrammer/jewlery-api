import express from "express";
import {
  createBlog,
  deleteBlog,
  updateBlog,
  getAllblogs,
  getBlogById,
} from "../controllers/blog.js";

const router = express.Router();

router.get("/", getAllblogs);
router.get("/:id", getBlogById);
router.post("/", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
