import AsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../model/usermodel.js";

const protect = AsyncHandler(async (req, res, next) => {
	// check wether the user is logged in
	try {
		const token = req.cookies.token;
		if (!token) {
			return res.status(401).send("not authorized please login !");
		}

		// varify the token :
		const decode = jwt.decode(token, process.env.JWT_SECRET);
		// get user:

		const user = await User.findById(decode.id).select("-password");

		if (!user) {
			res.status(404).send("user not found !");
		}

		req.user = user;
		next();
	} catch (error) {
		res.status(401).send("not authorized ,token failed !");
	}
});

export default protect;
