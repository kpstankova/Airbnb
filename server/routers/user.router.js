const express = require("express");
const { updateUser, deleteUser } = require("../controllers/user.controller");
const passport = require("../auth/passportConfig");

const router = express.Router();

router.put(
  "/",
  passport.authenticate("blacklist-jwt", { session: false }),
  passport.authenticate("access-jwt", { session: false }),
  updateUser
);

router.delete(
  "/",
  passport.authenticate("access-jwt", { session: false }),
  deleteUser
);

module.exports = router;
