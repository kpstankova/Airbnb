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
    table.datetime("start_date").notNullable();
    table.datetime("end_date").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
