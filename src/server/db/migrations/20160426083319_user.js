exports.up = (knex, Promise) => Promise.all([
  knex.schema.withSchema('public').createTableIfNotExists('users', (table) => {
    table.increments('id').primary();
    table.string('username', 32).unique().notNullable();
    table.string('first_name', 32).notNullable();
    table.string('last_name', 32).notNullable();
    table.uuid('uuid', 36).notNullable();
    table.string('display_name');
    table.string('password').notNullable();
    table.string('avatar');
    table.string('email', 64).unique().notNullable();
    table.string('twitter');
    table.string('facebook');
    table.string('location');
    table.string('role').notNullable().defaultTo('admin');
    table.string('bio');
    table.string('website');
    table.string('slug');
    table.string('status');
    table.timestamps();
  }),

  knex.schema.withSchema('public').createTableIfNotExists('posts', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable().unique();
    table.string('slug').notNullable().unique();
    table.text('content').notNullable();
    table.text('edit_body').notNullable();
    table.string('image');
    table.integer('author_id').references('id').inTable('users');
    table.integer('views').defaultTo(0);
    table.boolean('is_public').defaultTo(false);
    table.timestamps();
  })
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('users'),
  knex.schema.dropTable('posts')
]);
