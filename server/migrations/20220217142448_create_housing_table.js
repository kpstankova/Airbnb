/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("housing", (table) => {
    table.increments("id").primary();
    table.string("title", 128).notNullable();
    table.string("description", 512);
    table
      .integer("owner")
      .unsigned()
      .notNullable()
      .references("user_id")
      .inTable("user");
    table.double("rating");
    table.integer("guests");
    table.double("long");
    table.double("lat");
    table.string("city");
    table.double("price");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("housing");
};
