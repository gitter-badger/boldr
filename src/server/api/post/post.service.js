import Post from 'server/db/models/post';

const PostService = {

  getPostByTitle: async(postTitle) => {
    return await Post.query('where', 'title', postTitle).fetch();
  }
};

export default PostService;
