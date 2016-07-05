exports.up = (knex, Promise) => {
  return knex.schema.createTable('services', table => {
    table.increments();
    table.boolean('health');
    table.boolean('human');
    table.boolean('technology');
    table.boolean('material');
    table.string('subcategory');
    table.string('description', 2000);
    table.string('hours', 2000);
    table.string('verified');
    table.string('link');
    table.integer('org_id').references('id').inTable('orgdata').onDelete('cascade');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('services');
};
