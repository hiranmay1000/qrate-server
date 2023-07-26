const userRouter = require("express").Router();

const updateRoute = require("./SubRoutes/update");
const deleteRoute = require("./SubRoutes/delete");
const followRoute = require("./SubRoutes/follow");
const unfollowRoute = require("./SubRoutes/unfollow");
const getByUserId = require("./SubRoutes/getByUserId");
const getByUsername = require("./SubRoutes/getByUsername");
const searchUserRoute = require("./SubRoutes/searchUser");

userRouter.use("/update", updateRoute);
userRouter.use("/delete", deleteRoute);
userRouter.use("/follow", followRoute);
userRouter.use("/unfollow", unfollowRoute);
userRouter.use("/id", getByUserId);
userRouter.use("/username", getByUsername);
userRouter.use("/accounts", searchUserRoute);

module.exports = userRouter;
