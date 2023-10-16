const { encryptPassword } = require("../generals/encryptPassword");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex("users").del();
  await knex("users").insert([
    {
      name: "Admin",
      email: "admin@admin.com",
      password: encryptPassword(1234),
      key_bot: null,
    },
  ]);
};
