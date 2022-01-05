const Knex = require("knex");
const { Model } = require("objection");
const express = require("express");
require("dotenv").config();
const dbConfig = require("./knexfile");
const router = require("./routers/api.router");

const knex = Knex(dbConfig);
Model.knex(knex);

const app = express();

app.use(express.json());
app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
