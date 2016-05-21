import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import * as articleActions from 'app/state/modules/article/article.actions';
import Loader from 'app/components/Loader';
import { changeArticlePublishSetting } from 'app/api/articleEndpoint';
import Editor from 'app/components/Editor';

class CreateArticle extends Component {
  constructor() {
    super();
    this.contentState = this.contentState.bind(this);
  }
  contentState() {
    const boldrEditor = this.refs.boldrEditor;
    const content = boldrEditor.getContent();
    console.log(content); // eslint-disable-line
  }
  render() {
    const { article, loading } = this.props;

    return (
      <div>
      <Paper
          zDepth={3}
          style={{ padding: 40 }}
          className="col-md-offset-3 col-md-6">
            <Editor ref="boldrEditor" placeholder="Write your content..." />
            <button onClick={ this.contentState }> Content </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);
