module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('articles', [
      {
        id: 1,
        title: 'Some Post',
        slug: 'some-post',
        featureImage: '',
        content: '{"blocks": [{"key": "9pffu", "text": "This is testing a post with tags.", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}',
        markup: 'Somewhere',
        authorId: 1,
        status: 'published',
        views: 0,
        createdAt: '2016-06-05 21:14:45.196+00',
        updatedAt: '2016-06-05 21:14:45.196+00'
      }
    ], {});
  },
  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('articles', null, {});
  }
};
