import { Database } from '../connector';
import Post from './post';

// const Tag = Bookshelf.Model.extend({
//   tableName: 'tags',
//   // hack for pagination of /blog/tags/:slug
//   paginationLimit: 10,
//   // hack for pagination of /blog/tags/:slug
//   limit: 5,
//   // hack for pagination of /blog/tags/:slug
//   currentpage: 1,

//   post: () => this.belongsToMany(Post, 'post_tags', 'tag_id'),
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
class Tag extends Database.Model {
  // The 'tableName' property is omitted on purpose, as it gets assigned
  // automatically based on the Model's class name.

  // static get primaryKey() { return 'rank'; }

  static get related() {
    return {
      posts: this.belongsTo('Post')
    };
  }
}
Database.register(Tag);
export default Tag;
