const express = require("express");
// const promiseRouter = require("express-promise-router");
// const User = require("../models/User");
const {
  register,
  login,
  verify,
  changePassword,
  setNewPassword,
  forgotPassword,
  refresh,
  logout,
} = require("../controllers/auth.controller");
const passport = require("../auth/passportConfig");

const router = express.Router();

router.post(
  "/login",
  passport.authenticate("airbnb-local", { session: false }),
  login
);

router.put(
  "/changePassword",
  passport.authenticate("access-jwt", { session: false }),
  changePassword
);

router.post(
  "/refresh",
  passport.authenticate("blacklist-jwt", { session: false }),
  passport.authenticate("refresh-jwt", { session: false }),
  refresh
);

router.post("/register", register);
router.post("/forgotPassword", forgotPassword);
router.get("/verify/:uid", verify);
router.post("/logout", logout);
router.put("/setNewPassword", setNewPassword);

module.exports = router;
