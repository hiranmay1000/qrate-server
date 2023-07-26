const router = require("express").Router();

const verifyToken = require("../../../Middleware/verify.auth");
const User = require("../../../Models/model.user");

// FOLLOW
router.put("/:_id", verifyToken, async (req, res) => {
	try {
		if (req.verifiedUser._id === req.params._id) {
			return res.status(403).json({
				success: false,
				msg: "you cannot follow yourself",
			});
		}

		const userLoggedIn = await User.findById(req.verifiedUser._id);
		const userToFollow = await User.findById(req.params._id);

		console.log(userLoggedIn.username);
		console.log(userToFollow.username);

		if (userLoggedIn.followings.includes(req.params._id)) {
			return res.status(403).json({
				success: false,
				msg: "You already follow " + userToFollow.username,
			});
		}

		await userLoggedIn.updateOne({
			$push: {
				followings: req.params._id,
				notifications: "You started to follow " + userToFollow.username,
			},
		});
		await userToFollow.updateOne({
			$push: {
				followers: req.verifiedUser._id,
				notifications: "You got new fan " + userLoggedIn.username,
			},
		});

		return res.status(201).json({
			success: true,
			msg: "You started to follow " + userToFollow.username,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			msg: error.message,
		});
	}
});

module.exports = router;
