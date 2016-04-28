import { Bookshelf } from '../connector';
import Post from './Post';

const Tag = Bookshelf.Model.extend({
  tableName: 'tags',
  // hack for pagination of /blog/tags/:slug
  paginationLimit: 10,
  // hack for pagination of /blog/tags/:slug
  limit: 5,
  // hack for pagination of /blog/tags/:slug
  currentpage: 1,

  posts: () => this.belongsToMany(Post),
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

export default Tag;