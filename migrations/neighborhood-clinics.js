exports.up = function(knex, Promise) {
  return knex.schema.createTable('neighborhood-clinics', function(table) {
    table.string('name');
    table.string('phone');
    table.string('address');
    table.string('description');
    table.string('hours');
    table.int('lat');
    table.int('long');
    table.string('verified');
    table.string('link');
  });
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('neighborhood-clinics');
}
