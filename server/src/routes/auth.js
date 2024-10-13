import { Router } from "express";
import { body } from "express-validator";
import {
	loginctrl,
	logoutctrl,
	signupctrl,
} from "../controller/authControl.js";

const authRouter = Router();

authRouter.post(
	"/api/v1/auth/signup",
	[
		body("username").notEmpty().withMessage("please provide username"),
		body("email")
			.notEmpty()
			.withMessage("please provide email")
			.isEmail()
			.withMessage("please provide valid email address"),
		body("password")
			.notEmpty()
			.withMessage("please provide password")
			.isLength({ min: 5 })
			.withMessage("password must be at least 5 characters"),
	],
	signupctrl
);
authRouter.post(
	"/api/v1/auth/login",
	[
		body("email")
			.notEmpty()
			.withMessage("please provide email")
			.isEmail()
			.withMessage("please provide valid email address"),
		body("password")
			.notEmpty()
			.withMessage("please provide password")
			.isLength({ min: 5 })
			.withMessage("password must be at least 5 characters"),
	],
	loginctrl
);
authRouter.post("/api/v1/auth/logout", logoutctrl);

export default authRouter;
