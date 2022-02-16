const Knex = require("knex");
const { Model } = require("objection");
const env = require("./auth/env")[process.env.NODE_ENV || "local"];
const express = require("express");
// const flash = require("express-flash");
require("dotenv").config();
const router = require("./routers/api.router");
const knexConfig = require("./knexfile");

const knex = Knex(knexConfig);
Model.knex(knex);

const app = express();

app.use(express.json());
// app.use(flash());
app.use("/api", router);

app.listen(env.port, () => {
  console.log(`Server listening on port ${env.port}`);
});
