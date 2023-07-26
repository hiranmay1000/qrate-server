const router = require("express").Router();
const bcrypt = require("bcryptjs");

const User = require("../../../Models/model.user");
const verifyUserJWT = require("../../../Middleware/verify.auth");

// UPDATE
router.put("/:_id", verifyUserJWT, async (req, res) => {
	try {
		// Only logged user can request for update
		if (req.verifiedUser._id !== req.params._id) {
			return res.status(403).json({
				success: false,
				msg: "You are not allowed to update other users",
			});
		}

		// User wants to update password
		if (req.body.password) {
			const salt = await bcrypt.genSalt(process.env.SALT_ROUNDS);
			req.body.password = await bcrypt.hash(req.body.password, salt);
		}

		// Update user
		const updatedUser = await User.findByIdAndUpdate(req.params._id, { $set: req.body }, { new: true });

		if (!updatedUser) {
			return res.status(404).json({
				success: false,
				msg: "User not found",
			});
		}

		return res.status(201).json({
			success: true,
			msg: "User details updated successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			msg: error.message,
		});
	}
});

module.exports = router;
