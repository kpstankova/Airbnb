const express = require("express");
const passport = require("../auth/passportConfig");

const router = express.Router();

const {
  createUser,
  getUsers,
  fail,
} = require("../controllers/test.controller");

router.get("/", createUser);
router.get("/fail", fail);
router.get(
  "/users",
  passport.authenticate("access-jwt", {
    session: false,
    failureRedirect: "/api/test/fail",
  }),
  getUsers
);

module.exports = router;
