import { Bookshelf } from '../connector';
import User from './User';
import Tag from './Tag';
const Post = Bookshelf.Model.extend({
  tableName: 'posts',
  author: () => this.belongsTo(User),
  tags: () => this.hasMany(Tag),
  initialize: function init() {
    this.on('updating', () => {
      this.attributes.updated_at = new Date();
    });

    this.on('creating', () => {
      this.attributes.created_at = new Date();
    });

    this.on('fetching', () => {
      this.attributes.views++;
    });
  }
});

export default Post;
