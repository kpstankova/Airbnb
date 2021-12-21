const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "user";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "password"],
      properties: {
        user_id: { type: "integer" },
        email: { type: "string", minLength: 1, maxLength: 128 },
        pasword: { type: "string", minLength: 6 },
        phone: { type: "string" },
        name: { type: "string", minLength: 1 },
        verified: { type: "integer" },
        profile_pic: { type: "string" },
      },
    };
  }
}

module.exports = User;
