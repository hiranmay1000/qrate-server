const router = require("express").Router();
const verifyToken = require("../../../Middleware/verify.auth");
const User = require("../../../Models/model.user");

// GET USER BASED ON USERNAME
router.get("/:username", verifyToken, async (req, res) => {
	try {
		const user = await User.findOne({ username: req.params.username });
		if (!user) {
			return res.status(404).json({
				success: false,
				msg: "User not found",
			});
		}

		const { password, updatedAt, ...UserData } = user._doc;

		return res.status(200).json({
			...UserData,
			success: true,
			msg: "user found",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			msg: error.message,
		});
	}
});

module.exports = router;
