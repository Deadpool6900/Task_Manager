import { Router } from "express";
import {
	addtask,
	get_allTasks,
	get_task,
	remove,
	update,
} from "../controller/taskControl.js";
import { body } from "express-validator";
import protect from "../middleware/authMiddlware.js";

const router = Router();

router.get("/api/v1/tasks/get", protect, get_allTasks);
router.get("/api/v1/tasks/get/:id", protect, get_task);
router.post(
	"/api/v1/tasks/add",
	protect,
	[
		body().notEmpty().withMessage("please provide task info"),
		body("title").notEmpty().withMessage("please provide title of the task"),
	],
	addtask
);
router.patch("/api/v1/tasks/edit/:id", protect, update);
router.delete("/api/v1/tasks/delete/:id", protect, remove);
export default router;
