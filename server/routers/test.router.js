const express = require("express");

const router = express.Router();

const { createUser, getUsers } = require("../controllers/test.controller");

router.get("/", createUser);
router.get("/users", getUsers);

module.exports = router;
