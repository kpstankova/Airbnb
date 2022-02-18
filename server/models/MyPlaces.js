const { Model } = require("objection");

class MyPlaces extends Model {
  static get tableName() {
    return "my_places";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [],

      properties: {
        user_id: { type: "integer" },
        housing_id: { type: "integer" },
      },
    };
  }
}

module.exports = MyPlaces;
