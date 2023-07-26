const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../../Models/model.user");

const isEmail_Username_Taken = async (username, email) => {
	const existingUser_username = await User.findOne({ username });
	const existingUser_email = await User.findOne({ email });

	return { existingUser_username, existingUser_email };
};

// SIGNUP
router.post("/", async (req, res) => {
	try {
		const { name, email, username, password } = req.body;

		// Var to store error fields
		let errFields = [];

		// Check password length

		// Identify error input fields
		Object.keys(req.body).forEach((field) => {
			if (req.body[field] === "") {
				errFields.push(field);
			}
		});

		// Check if any error fields occurred
		if (!name || !email || !username || !password) {
			return res.status(403).json({
				success: false,
				errFields,
				msg: "Please fill all the required fields",
			});
		}

		if (password.length < 8) {
			errFields.push("password");
			return res.status(403).json({
				success: false,
				errFields,
				msg: "Password should be minimum 8 characters long!",
			});
		}

		// Check if username and email are already taken
		const { existingUser_username, existingUser_email } = await isEmail_Username_Taken(username, email);

		// Check if any error fields occurred
		if (existingUser_username || existingUser_email) {
			let msg;
			if (existingUser_username) {
				errFields.push("username");
				msg = "Username is already taken";
			}

			if (existingUser_email) {
				errFields.push("email");
				msg = "Email is already registered";
			}

			if (existingUser_username && existingUser_email) {
				msg = "This email and username are already registered with Ratera";
			}

			return res.status(403).send({
				success: false,
				errFields,
				msg,
			});
		}

		// Generate salt and convert into hashed password for security
		const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create new user
		const user = new User({
			name,
			email,
			username,
			password: hashedPassword,
		});
		// Save the newly created user in the database
		const isSaved = await user.save();

		// Check if the user has successfully saved
		if (isSaved) {
			// Everything is fine return success (New user created)
			return res.status(201).json({
				success: true,
				msg: "User registered successfully",
			});
		} else {
			return res.status(403).json({
				success: false,
				msg: "Failed to save user data to the database",
			});
		}
	} catch (error) {
		return res.status(500).json({
			success: false,
			msg: "Something went wrong, try refreshing the page!",
		});
	}
});

module.exports = router;
