import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Article from 'common/components/scenes/Dashboard/Article';
import Loader from 'common/components/Loader';
import { bindActionCreators } from 'redux';
import * as articleActions from 'common/state/modules/article/article.actions';

class ArticleList extends Component {
  componentWillMount(dispatch) {
    this.props.articleActions.fetchArticles();
  }

  render() {
    const { article, loading } = this.props;

    return (
      <div>

       <div className="container">
         { loading ? <Loader /> : <Article articles={ this.props.article.articles } /> }
       </div>
      </div>
      );
  }
}
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

ArticleList.propTypes = {
  articleActions: PropTypes.func.isRequired,
  article: PropTypes.object,
  loading: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
