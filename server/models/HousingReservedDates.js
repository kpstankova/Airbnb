const { Model } = require("objection");

class HousingReservedDates extends Model {
  static get tableName() {
    return "housing_reserved_dates";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [],
      properties: {
        housing_id: { type: "integer" },
        guest_id: { type: "integer" },
        start_date: { type: "string" },
        end_date: { type: "sting" },
      },
    };
  }
}

module.exports = HousingReservedDates;
