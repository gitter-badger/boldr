import r from './index';
require('rethinkdb-init')(r);

const initialize = () => r.init({
  host: process.env.RDB_HOST || 'localhost',
  port: process.env.RDB_PORT || 28015,
  db: process.env.RDB_NAME || 'boldr_dev'
},
  [
    {
      name: 'articles',
      primaryKey: 'articleId',
      durability: 'soft',
      indexes: [
        {
          name: 'authorId'
        }, {
          name: 'slug'
        }, {
          name: 'title'
        }, {
          name: 'isDraft'
        }, {
          name: 'createdAt'
        }, {
          name: 'tagId',
          multi: true
        }]
    }, {
      name: 'users',
      primaryKey: 'userId',
      durability: 'soft',
      indexes: [
        {
          name: 'email'
        }, {
          name: 'roleId'
        },
        {
          name: 'displayName'
        },
        {
          name: 'createdAt'
        },
        {
          name: 'verificationToken'
        }
      ]
    }, {
      name: 'collections',
      primaryKey: 'collectionId',
      durability: 'soft',
      indexes: [
        {
          name: 'slug'
        },
        {
          name: 'type'
        },
        {
          name: 'createdAt'
        }
      ]
    }, {
      name: 'roles',
      primaryKey: 'roleId',
      durability: 'soft',
      indexes: [
        {
          name: 'userId',
          multi: true
        }, {
          name: 'name'
        }
      ]
    }, {
      name: 'tags',
      primaryKey: 'tagId',
      durability: 'soft',
      indexes: [
        {
          name: 'articleId',
          multi: true
        },
        {
          name: 'tag'
        }
      ]
    }, {
      name: 'settings',
      primaryKey: 'settingsId',
      durability: 'soft',
      index: [
        {
          name: 'setting'
        }, {
          name: 'userId'
        }
      ]
    }, {
      name: 'menus',
      primaryKey: 'menuId',
      durability: 'soft',
      indexes: [
        {
          name: 'slug'
        }, {
          name: 'link'
        }, {
          name: 'page'
        }
      ]
    }, {
      name: 'pages',
      primaryKey: 'pageId',
      durability: 'soft',
      indexes: [
        {
          name: 'slug'
        }, {
          name: 'createdAt'
        }
      ]
    }, {
      name: 'articlesTags',
      durability: 'soft',
      indexes: [
        {
          name: 'articleId'
        },
        {
          name: 'tagId'
        }
      ]
    }
  ]);

export default initialize;
