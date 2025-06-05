import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/category.js";
import getMulterUploader from "../middlewares/uploadMiddleware.js";

const router = express.Router();

const uploadImage = getMulterUploader("categories");

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", uploadImage.single("imageUrl"), createCategory);
router.put("/:id", uploadImage.single("imageUrl"), updateCategory);
router.delete("/:id", deleteCategory);

export default router;
