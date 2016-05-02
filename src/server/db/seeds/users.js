exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('users').insert({
      id: 1,
      username: 'test',
      email: 'test@test.com',
      password: '$2a$10$kD3ocTTlXKehwn2pyYA9jeByenOv154u5yIlmkMiJzz21MRCBF54O',
      first_name: 'Bob',
      last_name: 'Smith',
      uuid: 'c84bc1eb-f048-4e2d-aca5-b371ac32afe1',
      display_name: 'Bob Smith',
      location: 'California',
      website: 'www.google.com',
      avatar: 'http://placehold.it/250x250',
      slug: 'whatever',
      facebook: 'none',
      twitter: 'none'
    })
    )
  .catch(function(error) {
    console.error('knex test seed', error);
  });
};
