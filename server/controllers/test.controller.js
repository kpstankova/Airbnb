const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    await User.query().insert({
      email: "testemail@gmail.com",
      password: "testpassword",
    });
    res.json({ message: "OK" });
  } catch (err) {
    console.log(err);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.query().select("*").from("user");
    console.log(users);
    res.json({ message: "OK" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createUser, getUsers };
