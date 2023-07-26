const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("./Database/mydatabase");
const middleware = require("./Api/Middleware/middleware");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(
	"*",
	cors({
		origin: "http://localhost:3000", // Replace with your frontend domain
		credentials: true,
	})
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API ROUTES
const authRoute = require("./Api/Routes/AuthRoute/authRouter");
const userRoute = require("./Api/Routes/UserRoute/userRouter");

// MIDDLEWARE
app.use(middleware);

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.use((req, res) => {
	res.status(404).json({
		err: "Requested url not found",
	});
});

module.exports = app;
