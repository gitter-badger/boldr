import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import * as articleActions from 'state/article/article.actions';
import Loader from 'shared/atm.Loader';
import { changeArticlePublishSetting } from 'app/config.api/ep.articles';

import NewArticleForm from 'scenes/Dashboard/org.Forms/NewArticleForm';

class CreateArticle extends Component {

  handleSubmit(values) {
    // const boldrEditor = this.refs.boldrEditor;
    // const content = boldrEditor.getContent().toJS();
    // console.log(content); // eslint-disable-line
    this.props.articleActions.createArticle(values);
  }
  render() {
    const { article, loading } = this.props;

    return (
      <div>
      <Helmet title="New Article" />
      <Paper
        zDepth={ 3 }
        style={ { padding: 40 } }
        className="col-md-offset-3 col-md-6"
      >
          <NewArticleForm onSubmit={ ::this.handleSubmit } />

        </Paper>
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

CreateArticle.propTypes = {
  articleActions: PropTypes.object,
  article: PropTypes.object,
  loading: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);
