import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPosts } from '../../redux/modules/post/post.actions';
import Loader from '../../components/Loader';

@connect(mapStateToProps)
class BlogContainer extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;
    dispatch(fetchPosts());
  }

  render() {
    const { loading, posts } = this.props;
    return (
      <div>

       <div className="container">
         BlogContainer?
         { loading ? <Loader /> : null}
       </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  posts: state.post.posts,
  loading: state.post.loading
});
export default BlogContainer;
