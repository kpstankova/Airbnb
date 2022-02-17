const { Model } = require("objection");

class Utils extends Model {
  static get tableName() {
    return "utils";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [],
      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }
}

module.exports = Utils;
