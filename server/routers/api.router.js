const express = require("express");
const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const testRouter = require("./test.router");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/test", testRouter);

module.exports = router;
