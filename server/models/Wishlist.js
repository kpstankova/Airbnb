const { Model } = require("objection");

class Wishlist extends Model {
  static get tableName() {
    return "wishlist";
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

module.exports = Wishlist;
