const { Model } = require("objection");

class JwtBlacklist extends Model {
  static get tableName() {
    return "jwt_blacklist";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [],

      properties: {
        id: { type: "integer" },
        token: { type: "string", minLength: 1, maxLength: 512 },
      },
    };
  }
}

module.exports = JwtBlacklist;
