exports.up = (knex, Promise) => Promise.all([
  knex.schema.withSchema('public').createTableIfNotExists('post_tags', (table) => {
    table.increments();
    table.bigInteger('tag_id').unsigned().references('id').inTable('tags');
    table.bigInteger('post_id').unsigned().references('id').inTable('posts');
  })
]);


exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('post_tags')
]);
