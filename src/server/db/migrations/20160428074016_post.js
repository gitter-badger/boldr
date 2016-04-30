
exports.up = (knex, Promise) => Promise.all([
  knex.schema.withSchema('public').createTableIfNotExists('posts', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable().unique();
    table.string('slug').notNullable().unique();
    table.text('markup').nullable();
    table.text('content').notNullable();
    table.string('image').nullable();
    table.integer('author_id').references('id').inTable('users');
    table.integer('views').defaultTo(0);
    table.boolean('is_public').defaultTo(true);
    table.timestamps();
  })
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('posts')
]);
