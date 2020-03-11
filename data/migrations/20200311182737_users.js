exports.up = async function(knex) {
  await knex.schema.creatTable("users", table => {
    table.increments();
    table
      .text("username")
      .notNull()
      .unique();
    table.text("password").notNull();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("users");
};
