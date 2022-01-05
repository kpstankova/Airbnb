const express = require("express");
const User = require("../models/User");
const { register, login, logout } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
