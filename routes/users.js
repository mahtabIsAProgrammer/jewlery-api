import express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
} from "../controllers/users.js";
import getMulterUploader from "../middlewares/uploadMiddleware.js";

const router = express.Router();

const uploadUserImage = getMulterUploader("users");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", uploadUserImage.single("imageUrl"), createUser);
router.put("/:id", uploadUserImage.single("imageUrl"), updateUser);
router.delete("/:id", deleteUser);

export default router;
