/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("housing_utils", (table) => {
    table
      .integer("housing_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("housing");
    table
      .integer("util_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("utils");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
