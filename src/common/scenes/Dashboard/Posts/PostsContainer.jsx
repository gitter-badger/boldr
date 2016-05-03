import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postActions from 'common/redux/modules/post/post.actions';

@connect(mapStateToProps, mapDispatchToProps)
class PostsContainer extends Component {
  render() {
    return (
      <div>

       <div className="container">
       PostsContainer
       { this.props.children }
       </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    post: state.post
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    postActions: bindActionCreators(postActions, dispatch)
  };
};


export default PostsContainer;
