exports.up = function(knex, Promise) {
  return knex.schema.createTable('neighborhood-clinics', function(table) {
    table.int('location').references('locations.id');
    table.increments('id');
    table.string('name');
    table.string('phone');
    table.string('address');
  });
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('neighborhood-clinics');
}
