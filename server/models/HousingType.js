const { Model } = require("objection");

class HousingType extends Model {
  static get tableName() {
    return "housing_type";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [],
      properties: {
        id: { type: "integer" },
        type: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }
}

module.exports = HousingType;
