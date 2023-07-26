const router = require("express").Router();

const User = require("../../../Models/model.user");

const VerifyAuth = require("../../../Middleware/verify.auth");

// GET RANDOM USER
router.get("/:_id", VerifyAuth, async (req, res) => {
	try {
		const user = await User.findOne({
			_id: {
				_id: req.params._id,
			},
		});
		if (!user) {
			return res.status(404).json({
				success: false,
				name: "Deleted account",
				msg: "This account does not exist or it has been deleted",
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
