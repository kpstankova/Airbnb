const JwtBlacklist = require("../models/JwtBlacklist");

const blackListToken = async (token) => {
  return await JwtBlacklist.query().insert({
    token: token,
  });
};

const checkToken = async (token) => {
  return await JwtBlacklist.query().where({ token: token }).first();
};

module.exports = {
  blackListToken,
  checkToken,
};
