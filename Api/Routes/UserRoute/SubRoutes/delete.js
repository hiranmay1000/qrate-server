const router = require("express").Router();

const verifyToken = require("../../../Middleware/verify.auth");
const User = require("../../../Models/model.user");

// DELETE
router.delete("/:_id", verifyToken, async (req, res) => {
	try {
		console.log(req.verifiedUser.isAdmin);
		const requestedUserId = req.params._id;

		if (req.verifiedUser.isAdmin) {
			// Admin user can delete any user (except themselves, if required)
			if (requestedUserId === req.verifiedUser._id) {
				return res.status(403).json({
					success: false,
					msg: "Unauthorized: Admin cannot delete their own account",
				});
			}

			await User.findByIdAndDelete(requestedUserId);
			return res.status(204).json({
				success: true,
				msg: "User deleted successfully",
			});
		} else {
			// Non-admin user can only delete their own account
			if (requestedUserId !== req.verifiedUser._id) {
				return res.status(403).json({
					success: false,
					msg: "Unauthorized: You cannot delete other users",
				});
			}

			const userToBeDeleted = await User.findByIdAndDelete(requestedUserId);

			if (!userToBeDeleted) {
				return res.status(204).json({
					success: false,
					msg: "Invalid userID or user does not exist in the database",
				});
			}

			return res.status(204).json({
				success: true,
				msg: "User deleted successfully",
			});
		}
	} catch (error) {
		return res.status(500).json({
			success: false,
			msg: error.message,
		});
	}
});

module.exports = router;
