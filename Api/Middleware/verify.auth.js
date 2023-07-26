const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	try {
		// let token = req.headers.authorization;
		let token = req.cookies?.JWT_token;

		if (!token) {
			return res.status(401).json({
				msg: "Unauthorized: No Token Provided!",
			});
		}

		token = token.split(" ")[1];

		const decode = jwt.verify(token, process.env.SECRET_KEY);

		req.verifiedUser = decode;
		next();
	} catch (error) {
		res.status(401).json({
			msg: "Unauthorized: Invalid token!",
		});
	}
};

module.exports = verifyToken;
