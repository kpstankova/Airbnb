const { Model } = require("objection");

class Housing extends Model {
  static get tableName() {
    return "housing";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [],
      properties: {
        id: { type: "integer" },
        title: { type: "string", minLength: 1, maxLength: 128 },
        description: { type: "string", minLength: 1, maxLength: 512 },
        owner: { type: "integer" },
        rating: { type: "number" },
        guests: { type: "integer" },
        long: { type: "number" },
        lat: { type: "number" },
        city: { type: "string", minLength: 1, maxLength: 255 },
        price: { type: "number" },
      },
    };
  }
}

module.exports = Housing;
