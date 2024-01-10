const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on("connected", (connected) => {
	console.log("Database connected successfully!");
});

mongoose.connection.on("error", (err) => {
	console.log("Failed connetion to database due to ", err);
});

module.exports = mongoose;
