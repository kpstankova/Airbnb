const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SALT = 10;

const register = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Registration failed." });
  }
  try {
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, SALT);

    const result = await User.query().insert({ email, password });

    if (!result) {
      return res.status(400).json({ message: "Registration failed." });
    }

    return res.status(201).json({ message: "Successful registration" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
};

const login = async (req, res) => {
  const payload = {
    email: req.body.email,
  };

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

  return res.status(200).json({
    access_token: accessToken,
    refreshToken: refreshToken,
  });
};

const logout = async (req, res) => {
  res.sendStatus(200);
};

module.exports = { register, login, logout };
