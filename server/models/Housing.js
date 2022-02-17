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
        rating: { type: "double" },
        guests: { type: "integer" },
      },
    };
  }
}

module.exports = Housing;
