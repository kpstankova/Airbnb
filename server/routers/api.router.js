const express = require("express");
const authRouter = require("./auth.router");
const testRouter = require("./test.router");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/test", testRouter);

module.exports = router;
