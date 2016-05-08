import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as articleActions from 'common/state/modules/article/article.actions';

class ArticlesContainer extends Component {
  render() {
    return (
      <div>

       <div className="container">
       ArticlesContainer
       { this.props.children }
       </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    article: state.article
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    articleActions: bindActionCreators(articleActions, dispatch)
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ArticlesContainer);
