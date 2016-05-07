import { Database } from '../connector';
import User from './user';
// import Tag from './tag';

// const Post = Bookshelf.Model.extend({
//   tableName: 'posts',
//   author: () => this.belongsTo(User, 'user_id'),
//   tag: () => this.hasMany(Tag, 'post_tags', 'post_id'),
//   initialize: function init() {
//     this.on('updating', () => {
//       this.attributes.updated_at = new Date();
//     });

//     this.on('creating', () => {
//       this.attributes.created_at = new Date();
//     });

//     this.on('fetching', () => {
//       this.attributes.views++;
//     });
//   }
// });
//
class Post extends Database.Model {
  // The 'tableName' property is omitted on purpose, as it gets assigned
  // automatically based on the Model's class name.

  static get primaryKey() { return 'id'; }

  static get related() {
    return {
      user: this.belongsTo('User'),
      tags: this.hasMany('Tag')
    };
  }
}
Database.register('Post');
export default Post;
