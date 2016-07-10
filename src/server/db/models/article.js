import moment from 'moment';
import DataTypes from 'sequelize';
import Model, { correctTime } from '../sequelize';
import uuid from 'node-uuid';

/**
 * Creates a UUID for the User if it's not given.
 * @param  {Object} instance Instance object of the User
 * @return {void}
 */
function createUUIDIfNotExist(instance) {
  if (!instance.id) {
    instance.id = uuid.v4();
  }
}
const Article = Model.define('articles', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  title: {
    type: DataTypes.STRING(256),
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING(256),
    allowNull: false,
    unique: true
  },
  featureImage: {
    type: DataTypes.STRING(256),
    defaultValue: ''
  },
  content: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  markup: {
    type: DataTypes.JSON,
    defaultValue: '',
    allowNull: true
  },
  authorId: {
    type: DataTypes.UUID
  },
  status: {
    type: DataTypes.ENUM,
    allowNull: false,
    values: ['draft', 'published', 'archived'],
    defaultValue: 'draft'
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
}, {
  tableName: 'articles',
  freezeTableName: true,
  hooks: {
    beforeValidate: createUUIDIfNotExist
  },
  indexes: [
    {
      fields: ['slug', 'createdAt', 'status']
    }
  ],
  instanceMethods: {
    publishedAt() {
      return moment(this.createdAt, 'dddd, mmmm dS, yyyy, h:MM TT');
    },
    shortDescription() {
      return this.content.length > 30 ? `${this.content.substr(0, 30)}...` : this.content;
    }
  }
});
export default Article;
