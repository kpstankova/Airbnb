/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("housing_reserved_dates", (table) => {
    table
      .integer("housing_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("housing");
    table
      .integer("guest_id")
      .unsigned()
      .notNullable()
      .references("user_id")
      .inTable("user");
    table.date("start_date").notNullable();
    table.date("end_date").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
