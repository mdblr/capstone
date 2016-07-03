exports.up = function(knex, Promise) {
  knex.schema.createTable('services', function(table) {
    table.int('resource').references('resources.id');
    table.increments('id');
    table.boolean('health');
    table.boolean('human');
    table.boolean('technology');
    table.boolean('material');
    table.string('subcategory');
    table.string('description');
    table.string('hours');
    table.string('verified');
    table.string('link');
  });
}

exports.down = function(knex, Promise) {
  knex.schema.dropTable('services');
}
