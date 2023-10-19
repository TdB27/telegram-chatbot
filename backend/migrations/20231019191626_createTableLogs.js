/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("logs", (table) => {
    table.increments("id").primary();
    table.bigInteger("bot_id");
    table.bigInteger("chat_id");
    table.integer("message_id");
    table.string("name");
    table.string("text");
    table.string("type");
    table.timestamp("created_at");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("logs");
};
