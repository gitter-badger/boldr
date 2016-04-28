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
  })
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('users')
]);
