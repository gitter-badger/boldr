
exports.up = (knex, Promise) => Promise.all([
  knex.schema.withSchema('public').createTableIfNotExists('tags', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.text('description');
    table.bigInteger('post_id').references('id').inTable('posts');
    table.timestamps();
  })
  .table('posts', (table) => {
    table.integer('tags').references('id').inTable('tags');
  })
]);


exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('tags')
]);
