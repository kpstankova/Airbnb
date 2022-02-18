/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("wishlist", (table) => {
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("user_id")
      .inTable("user")
      .onDelete("CASCADE")
      .index();
    table
      .integer("housing_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("housing")
      .onDelete("CASCADE")
      .index();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("wishlist");
};
