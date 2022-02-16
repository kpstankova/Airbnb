require("dotenv").config();
const knexConfig = require("../knexfile");

module.exports = {
  local: {
    port: 3001,
    knexConfig: knexConfig.local,
    smtp: {},
  },
};
