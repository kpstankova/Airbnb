require("dotenv").config();

module.exports = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: process.env.DB_PASSWORD_LOCAL,
    database: "airbnb",
    timezone: "utc",
  },
};
