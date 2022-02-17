const { Model } = require("objection");

class HousingImages extends Model {
  static get tableName() {
    return "housing_images";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [],
      properties: {
        id: { type: "integer" },
        housing_id: { type: "integer" },
        image_path: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }
}

module.exports = HousingImages;
