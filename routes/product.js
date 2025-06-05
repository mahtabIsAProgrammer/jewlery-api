import express from "express";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProductById,
} from "../controllers/products.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
