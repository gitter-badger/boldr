export const dbTables = [
  {
    table: 'articles',
    pk: 'articleId'
  },
  {
    table: 'users',
    pk: 'userId'
  },
  {
    table: 'roles',
    pk: 'roleId'
  },
  {
    table: 'tags',
    pk: 'tagId'
  },
  {
    table: 'articles_tags',
    pk: 'id'
  },
  {
    table: 'menus',
    pk: 'menuId'
  },
  {
    table: 'settings',
    pk: 'settingId'
  },
  {
    table: 'pages',
    pk: 'pageId'
  },
  {
    table: 'collections',
    pk: 'collectionId'
  }
];

// Db Tables w/ Index
// ==================
export const dbTablesWithIndex = [
  {
    table: 'articles',
    index: 'authorId'
  },
  {
    table: 'articles',
    index: 'slug'
  },
  {
    table: 'articles',
    index: 'isDraft'
  },
  {
    table: 'articles',
    index: 'createdAt'
  },
  {
    table: 'articles',
    index: 'title'
  },
  {
    table: 'articles',
    index: 'tagIds'
  },
  {
    table: 'roles',
    index: 'userIds'
  },
  {
    table: 'roles',
    index: 'name'
  },
  {
    table: 'tags',
    index: 'name'
  },
  {
    table: 'tags',
    index: 'articleIds'
  },
  {
    table: 'articles_tags',
    index: 'tagId'
  },
  {
    table: 'articles_tags',
    index: 'articleId'
  },
  {
    table: 'collections',
    index: 'name'
  },
  {
    table: 'collections',
    index: 'type'
  },
  {
    table: 'collections',
    index: 'authorId'
  },
  {
    table: 'settings',
    index: 'userId'
  },
  {
    table: 'pages',
    index: 'slug'
  },
  {
    table: 'menus',
    index: 'name'
  },
  {
    table: 'users',
    index: 'email'
  },
  {
    table: 'users',
    index: 'roleId'
  },
  {
    table: 'users',
    index: 'username'
  },
  {
    table: 'users',
    index: 'createdAt'
  }
];
