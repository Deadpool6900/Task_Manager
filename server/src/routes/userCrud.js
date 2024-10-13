import { Router } from "express";
import User from "../model/usermodel.js";
import protect from "../middleware/authMiddlware.js";
import { deleteUser, updateUser } from "../controller/userControl.js";


const router = Router();

router.delete("/api/v1/user/deleteuser", protect, deleteUser);
router.patch("/api/v1/user/updateuser", protect, updateUser);

export default router;