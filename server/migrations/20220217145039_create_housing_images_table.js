/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("housing_images", (table) => {
    table.increments("id").primary();
    table
      .integer("housing_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("housing");
    table.string("image_path");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("housing_images");
};
