import express from "express";
import CookieParser from "cookie-parser";
import router from "./src/routes/main.js";
import connectdb from "./src/db/dbconnect.js";
import dotenv from "dotenv";

// import core from 'core'
const app = express();
const port = 5000;

app.use(CookieParser());
// app.use(
// 	cors({
// 		origin: process.env.CLIENT_URL,
// 		Credential: true,
// 	})
// );
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
const server = async() => {
	try {
        await connectdb();
		app.listen(port, () => {
			console.log("server :" + port);
		});
	} catch (error) {
		console.log("failed to connect !");
		process.exit(1);
	}
};

server();
