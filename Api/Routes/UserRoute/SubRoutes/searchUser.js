const router = require("express").Router();
const verifyToken = require("../../../Middleware/verify.auth");
const User = require("../../../Models/model.user");

// GET ALL (SEARCH) USERS
router.get("/all", verifyToken, async (req, res) => {
	try {
		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 5;
		const search = req.query.search || "";

		const users = await User.find({
			username: {
				$regex: search,
				$options: "i", // case-insensitive matching for the regex query
			},
		})
			.skip(page * limit)
			.limit(limit);

		const total = await User.countDocuments({
			username: {
				$regex: search,
				$options: "i",
			},
		});

		const result = {
			success: true,
			users,
			total,
			page: page + 1,
			limit,
		};

		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({
			success: false,
			msg: error.message,
		});
	}
});

module.exports = router;
