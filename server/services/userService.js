const User = require("../models/User");

const createUser = async (email, password, uid) => {
  return await User.query().insert({
    email: email,
    password: password,
    uid: uid,
  });
};

const getUserByEmail = async (email) => {
  return await User.query().where({ email: email }).first();
};

const setUserUid = async (email, uid) => {
  return await User.query().update({ uid: uid }).where({ email: email });
};

const verifyUser = async (uid) => {
  return await User.query()
    .update({ verified: 1, uid: "" })
    .where({ uid: uid });
};

const setNewPassword = async (uid, newPassword) => {
  return await User.query()
    .update({ password: newPassword, uid: "" })
    .where({ uid: uid });
};

const changePassword = async (email, password) => {
  return await User.query()
    .update({ password: password })
    .where({ email: email });
};

const deleteUser = async (email) => {
  return await User.query().where({ email: email }).del();
};

const updateUser = async (email, name, phone, profilePic) => {
  return await User.query()
    .update({ name: name, phone: phone, profile_pic: profilePic })
    .where({ email: email });
};

module.exports = {
  createUser,
  getUserByEmail,
  setUserUid,
  verifyUser,
  setNewPassword,
  changePassword,
  deleteUser,
  updateUser,
};
