const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../../Models/model.user");

// LOGIN
router.post("/", async (req, res) => {
	try {
		const { username, password } = req.body;
		let missingFields = [];

		if (!username && !password) {
			return res.status(422).json({
				success: false,
				msg: "Please enter username and password to proceed",
			});
		}

		const user = await User.findOne({ username });

		if (!user) {
			missingFields.push("username", "password");
			return res.status(401).json({
				missingFields,
				success: false,
				msg: "Invalid credentials",
			});
		}

		const matchPassword = await bcrypt.compare(password, user.password);

		if (!matchPassword) {
			missingFields.push("password");
			return res.status(401).json({
				missingFields,
				success: false,
				msg: "Incorrect combination username and password",
			});
		}

		const token = jwt.sign(
			{
				_id: user._id,
				name: user.name,
				username: user.username,
				email: user.email,
				phone: user.phone,
				isAdmin: user.isAdmin,
			},
			process.env.SECRET_KEY,
			{ expiresIn: "6h" }
		);

		// SET THE TOKEN AS HTTP-ONLY COOKIE
		res.cookie("JWT_token", token, {
			httpOnly: true,
			// secure: true,
			expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		});

		return res.status(200).json({
			success: true,
			token: token,
			msg: "Logging in, please wait...",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			msg: "Something went wrong! Try refreshing the page!",
		});
	}
});

module.exports = router;
