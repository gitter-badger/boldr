import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { TextField, RadioButtonGroup } from 'redux-form-material-ui';
import Checkbox from 'material-ui/Checkbox';
import { RadioButton } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import BoldrEditor from 'shared/components/org.BoldrEditor';
import NewArticleForm from './ArticleForm';
import { createArticle } from 'state/modules/article';

class ArticleEditor extends Component {
  handleSubmit(values, content) {
    const articleData = {
      title: values.title,
      tags: values.tags,
      status: values.status,
      content
    };
    console.log(articleData);

    this.props.dispatch(createArticle(articleData));
  }
  render() {
    return (
      <div>
        <NewArticleForm onSubmit={ ::this.handleSubmit } />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    article: state.article,
    isLoading: state.article.isLoading
  };
};
export default connect(mapStateToProps)(ArticleEditor);
