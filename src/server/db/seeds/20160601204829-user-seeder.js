module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        id: 1,
        email: 'test@test.com',
        firstname: 'Bob',
        lastname: 'Smith',
        password: '$2a$10$fj4wRaC0bckoVJW0CPylD.4pLemyNhEjxFz1wH5Mfpr5EdOIORL5u',
        location: 'Somewhere',
        bio: 'Bob is boring',
        avatar: 'http://placehold.it/250x250',
        website: 'https://boldr.io'
      }
    ], {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
