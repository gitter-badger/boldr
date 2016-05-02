import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPosts } from '../../redux/modules/post/post.actions';
import Loader from '../../components/Loader';
import Post from '../../components/scenes/Blog';

class BlogContainer extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;
    dispatch(fetchPosts());
  }

  render() {
    const { loading, post } = this.props;
    const postsMap = () => {
      return (
       <Post posts={ this.props.post.posts } />
      );
    };
    return (
      <div>

       <div className="container">
         BlogContainer?
         { loading ? <Loader /> : <Post posts={ this.props.post.posts } /> }
       </div>
      </div>
      );
  }
}
const mapStateToProps = (state) => ({
  post: state.post,
  loading: state.post.loading
});

export default connect(mapStateToProps, null)(BlogContainer);
