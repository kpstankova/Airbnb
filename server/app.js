const Knex = require("knex");
const { Model } = require("objection");
const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const dbConfig = require("./knexfile");
const User = require("./models/User");

const knex = Knex(dbConfig);
Model.knex(knex);

const app = express();

app.use(bodyParser.json());

app.get("/", async (req, res) => {
  try {
    await User.query().insert({
      email: "testemail@gmail.com",
      password: "testpassword",
    });
    res.json({ message: "OK" });
  } catch (err) {
    console.log(err);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.query().select("*").from("user");
    console.log(users);
    res.json({ message: "OK" });
  } catch (err) {
    console.log(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
