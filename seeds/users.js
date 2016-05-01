
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({
      id: 1,
      username: 'test',
      email: 'test@test.com',
      password: 'test',
      first_name: 'Bob',
      last_name: 'Smith',
      display_name: 'Bob Smith',
      location: 'California',
      website: 'www.google.com',
      avatar: 'http://placehold.it/250x250',
      slug: 'whatever',
      facebook: 'none',
      twitter: 'none'
    })
  );
};
