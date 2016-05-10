export const TABLES = {
  users: {
    indexes: ['email', 'username', 'createdAt']
  },
  groups: {
    indexes: ['name']
  },
  articles: {
    indexes: ['slug', 'createdAt']
  },
  pages: {
    indexes: ['slug']
  },
  tags: {
    indexes: ['slug']
  },
  categories: {
    indexes: ['slug']
  },
  menus: {
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
    permissions: ['edit', 'view', 'delete']
  }]
}];
