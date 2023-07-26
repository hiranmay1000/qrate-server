const authRouter = require("express").Router();

const loginRoute = require("./SubRoutes/login");
const signupRoute = require("./SubRoutes/signup");

authRouter.use("/login", loginRoute);
authRouter.use("/signup", signupRoute);

module.exports = authRouter;
