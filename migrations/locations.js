exports.up = (knex, Promise) => {
  return knex.schema.createTable('locdata', table => {
    table.increments();
    table.float('lat');
    table.float('long');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('locdata');
};
