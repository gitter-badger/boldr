import React, { Component } from 'react';
import { connect } from 'react-redux';

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

export default PostsContainer;
