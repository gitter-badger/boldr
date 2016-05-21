import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as articleActions from 'app/state/modules/article/article.actions';
import Loader from 'app/components/Loader';
import { changeArticlePublishSetting } from 'app/api/articleEndpoint';


class CreateArticle extends Component {
  render() {
    const { article, loading } = this.props;

    return (
      <div>

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
const mapDispatchToProps = (dispatch) => {
  return {
    articleActions: bindActionCreators(articleActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);