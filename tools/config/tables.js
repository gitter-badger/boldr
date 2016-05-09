export const TABLES = {
  user: {
    indexes: ['email', 'username', 'createdAt']
  },
  group: {
    indexes: ['name']
  },
  article: {
    indexes: ['slug', 'createdAt']
  },
  page: {
    indexes: ['slug']
  },
  tag: {
    indexes: ['slug']
  },
  category: {
    indexes: ['slug']
  }
};
export const TABLE_NAMES = Object.keys(TABLES);

export const ACL_ALLOW = [{
  roles: ['member'],
  allows: [{
    resources: ['article'],
    permissions: ['view']
  }]
}, {
  roles: ['admin'],
  allows: [{
    resources: ['category', 'group', 'tag', 'page', 'article', 'user'],
    permissions: ['edit','view','delete']
  }]
}];
