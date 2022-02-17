const { Model } = require("objection");

class HousingUtils extends Model {
  static get tableName() {
    return "housing_utils";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [],
      properties: {
        housing_id: { type: "integer" },
        util_id: { type: "integer" },
      },
    };
  }
}

module.exports = HousingUtils;
