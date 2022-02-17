const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwtGeneratorService = require("../services/jwtGeneratorService");
const jwtBlacklistService = require("../services/jwtBlacklistService");
const userService = require("../services/userService");
const emailService = require("../services/emailService");
require("dotenv").config();
const SALT = 10;

const register = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Registration failed." });
  }
  try {
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, SALT);
    const uid = generateuid();
    await userService.createUser(email, password, uid);
    await emailService.sendVerificationEmail(email, uid);
    return res.status(201).json({
      message:
        "Registration is successful. Check your email to verify your account.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};

const generateuid = () => {
  return crypto.randomBytes(6).toString("hex");
};

const loginAfterAuthentication = (payload) => {
  const accessToken = jwtGeneratorService.generateAccessToken(payload);
  const refreshToken = jwtGeneratorService.generateRefreshToken({
    accessToken,
  });

  return {
    payload,
    accessToken,
    refreshToken,
  };
};

const login = async (req, res) => {
  const payload = {
    id: req.user.user_id,
    email: req.user.email,
  };
  return res.status(200).json(loginAfterAuthentication(payload));
};

const verify = async (req, res) => {
  const uid = req.params.uid;
  if (!uid) return res.status(400).json({ message: "String not provided" });
  try {
    const user = await userService.verifyUser(uid);
    console.log(user);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ message: "Account verified" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const changePassword = async (req, res) => {
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  if (!oldPassword || !newPassword)
    return res
      .status(400)
      .json({ message: "Required information is not provided." });
  try {
    const email = req.user.email;
    const user = await userService.getUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found." });
    const passwordMatches = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatches)
      return res.status(400).json({ message: "Password doesn't match." });
    const hashedPassword = await bcrypt.hash(newPassword, SALT);
    await userService.changePassword(email, hashedPassword);
    return res.status(200).json({ message: "Password changed successfully." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/*
  TEST setNewPassword
 */
const setNewPassword = async (req, res) => {
  const newPassword = req.body.newPassword;
  const uid = req.params.uid;
  if (!newPassword || !uid)
    return res
      .status(400)
      .json({ message: "Required information is not provided" });
  try {
    const hashedPassword = await bcrypt.hash(newPassword, SALT);
    await userService.setNewPassword(uid, hashedPassword);
    return res.status(200).json({ message: "Password changed successfully." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const forgotPassword = async (req, res) => {
  const email = req.body.email;
  if (!email) return res.status(400).json({ message: "Email is not provided" });
  try {
    const uid = generateuid();
    const result = await userService.setUserUid(email, uid);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    await emailService.sendForgotPasswordEmail(email, uid);
    return res.status(200).json({
      message:
        "Message send successfully. Check your email to change your password.",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const refresh = async (req, res) => {
  const accessToken = req.user.accessToken;
  const refreshToken = req.body.refreshToken;
  if (!accessToken || !refreshToken)
    return res
      .status(400)
      .json({ message: "Required information is not provided" });
  try {
    await jwtBlacklistService.blackListToken(accessToken);
    await jwtBlacklistService.blackListToken(refreshToken);
    const { id, email } = await jwtGeneratorService.verifyToken(accessToken);
    return res.status(200).json(loginAfterAuthentication({ id, email }));
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const logout = async (req, res) => {
  const { accessToken, refreshToken } = req.body;
  if (!accessToken || !refreshToken)
    return res
      .status(400)
      .json({ message: "Required information is not provided" });
  try {
    await jwtBlacklistService.blackListToken(accessToken);
    await jwtBlacklistService.blackListToken(refreshToken);
    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  register,
  login,
  verify,
  changePassword,
  forgotPassword,
  refresh,
  logout,
};
