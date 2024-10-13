import mongoose, { model, Schema } from "mongoose";
import hashpassword from "../lib/encrypt.js";

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

UserSchema.pre("save", async function (next) {
	const user = this;
	// Check if the password field is modified (for cases like updating other fields without changing the password)
	if (!user.isModified("password")) {
		return next();
	}
	try {
		const hash = await hashpassword(user.password);
		// console.log(hash);
		user.password = hash;
		next();
	} catch (err) {
		console.log("trouble hashing password")
	}
});

const User = mongoose.model("users", UserSchema);
export default User;
