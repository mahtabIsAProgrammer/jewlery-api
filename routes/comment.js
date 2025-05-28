import express from "express";
import {
  createComment,
  deleteComment,
  updateComment,
  getAllComments,
  getCommentById,
} from "../controllers/comment.js";

const router = express.Router();

router.get("/", getAllComments);
router.get("/:id", getCommentById);
router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
