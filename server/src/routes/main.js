import { Router } from "express";
import authRouter from "./auth.js";
import userRouter from "./userCrud.js";
import taskRouter from "./taskCURD.js";
import protect from "../middleware/authMiddlware.js";

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(taskRouter);
router.get("/api/vi/user",protect, (req, res) => {
	res.status(200).send(req.user);
});

export default router;
