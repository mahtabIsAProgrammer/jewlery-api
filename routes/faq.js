import express from "express";
import {
  createFaq,
  deleteFaq,
  getAllFaqs,
  getFaqById,
  updateFaq,
} from "../controllers/faq.js";

const router = express.Router();

router.get("/", getAllFaqs);
router.get("/:id", getFaqById);
router.post("/", createFaq);
router.put("/:id", updateFaq);
router.delete("/:id", deleteFaq);

export default router;
