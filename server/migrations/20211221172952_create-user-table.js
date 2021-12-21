exports.up = function (knex) {
  return knex.schema.createTable("user", (table) => {
    table.increments("user_id").primary();
    table.string("email", 128).notNullable().unique();
    table.string("password").notNullable();
    table.string("phone").unique();
    table.string("name", 128);
    table.integer("verified").notNullable().defaultTo(0);
    table.string("profile_pic");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user");
};
