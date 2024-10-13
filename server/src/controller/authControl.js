import AsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import User from "../model/usermodel.js";
import bcrypt from "bcrypt";
import generateToken from "../lib/genrateToken.js";

export const signupctrl = AsyncHandler(async (req, res) => {
	const { body } = req;

	const result = validationResult(req);
	if (!result.isEmpty()) {
		return res.status(400).send(result.array());
	}

	const newuser = new User({
		username: body.username,
		email: body.email,
		password: body.password,
	});
	try {
		await newuser.save();
		res.status(200).send("signup successful");
	} catch (error) {
		res
			.status(401)
			.send(" signup failed | chech whether the user is already signed up");
	}
});

export const loginctrl = AsyncHandler(async (req, res) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		return res.status(400).send(result.array());
	}

	const { email, password } = req.body;
	const finduser = await User.findOne({ email });
	// console.log(finduser);
	if (!finduser) {
		return res.status(401).send("user not found");
	}
	const auth = await bcrypt.compare(password, finduser.password);
	// console.log(auth);
	if (!auth) {
		return res.status(401).send("password is incorrect");
	}
	const token = generateToken(finduser._id);

	// console.log(`token ==> ${token}`);
    if (auth && finduser ) {
			res.cookie("token", token, {
				maxAge: 1000 * 60 * 60 * 5,
				httpOnly: true,
				secure: true,
				sameSite: "strict",
				path: "/",
			});
			res.status(200).send("user login successfull !");
	}else{
		return res.status(401).send("invalid credentials")
	}
});

export const logoutctrl = AsyncHandler(async (req, res) => {
	res.clearCookie("token");
	res.status(200).send("user logout successful ");
});
