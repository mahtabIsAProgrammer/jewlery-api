import express from "express";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProductById,
} from "../controllers/products.js";
import getMulterUploader from "../middlewares/uploadMiddleware.js";

const router = express.Router();

const uploadImage = getMulterUploader("products");

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", uploadImage.single("image"), createProduct);
router.put("/:id", uploadImage.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
