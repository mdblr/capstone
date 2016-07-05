exports.up = (knex, Promise) => {
  return knex.schema.createTable('orgdata', table => {
    table.increments();
    table.string('name');
    table.string('phone_1');
    table.string('phone_2');
    table.string('address');
    table.integer('loc_id').references('id').inTable('locdata').onDelete('cascade');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('orgdata');
};
