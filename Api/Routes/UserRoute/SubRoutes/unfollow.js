const router = require("express").Router();
const verifyToken = require("../../../Middleware/verify.auth");
const User = require("../../../Models/model.user");

// UNFOLLOW
router.put("/:_id", verifyToken, async (req, res) => {
	try {
		if (req.verifiedUser._id === req.params._id) {
			return res.status(403).json({
				success: false,
				msg: "You cannot unfollow yourself",
			});
		}

		const userLoggedIn = await User.findById(req.verifiedUser._id);
		const userToUnfollow = await User.findById(req.params._id);

		if (!userLoggedIn.followings.includes(req.params._id)) {
			return res.status(403).json({
				success: false,
				msg: "You don't follow " + userToUnfollow.username,
			});
		}

		await userLoggedIn.updateOne({
			$pull: {
				followings: req.params._id,
			},
		});

		await userToUnfollow.updateOne({
			$pull: {
				followers: req.verifiedUser._id,
			},
		});

		await userLoggedIn.updateOne({
			$push: {
				notification: "You unfollowed " + userToUnfollow.username,
			},
		});

		return res.status(200).json({
			success: true,
			msg: "You unfollowed " + userToUnfollow.username,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			msg: error.message,
		});
	}
});

module.exports = router;
