exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('posts').insert({
      id: 1,
      title: 'Purple Penguins',
      slug: 'penguins',
      markup: '<h1>asdfasdfasdf</h1>',
      content: 'this stuff is stuff',
      image: 'http://placehold.it/760x300',
      author_id: 1,
      views: 0,
      is_public: true,
      created_at: '2016-04-30 22:05:19.551+00',
      updated_at: '2016-04-30 22:05:19.551+00'
    })
  ).catch(function(error) {
    console.error('knex test seed', error);
  });
};
