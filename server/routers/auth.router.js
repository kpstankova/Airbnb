const express = require("express");
// const promiseRouter = require("express-promise-router");
const User = require("../models/User");
const { register, login, logout } = require("../controllers/auth.controller");
const passport = require("../auth/passportConfig");

const router = express.Router();

router.post("/register", register);
router.post(
  "/login",
  passport.authenticate("airbnb-local", { session: false, failureFlash: true }),
  login
);
router.post("/logout", logout);

module.exports = router;
