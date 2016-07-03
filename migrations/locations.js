exports.up = function(knex, Promise) {
  knex.schema.createTable('coordinates', function(table) {
    table.increments('id');
    table.float('lat');
    table.float('long');
  });
}

exports.down = function(knex, Promsise) {
  knex.schema.dropTable('coordinates');
}
