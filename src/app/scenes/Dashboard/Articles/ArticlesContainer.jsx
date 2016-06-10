import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as articleActions from 'state/article/article.actions';
import ArticleList from './ArticleList';

ArticleList.need = [
  articleActions.fetchArticles
];

const ArticlesContainer = (props) => {
  return (
     <div>
     { props.children }
     </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    article: state.article,
    loading: state.article.loading
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    articleActions: bindActionCreators(articleActions, dispatch)
  };
};

ArticlesContainer.propTypes = {
  children: React.PropTypes.node
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesContainer);
