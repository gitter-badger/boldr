import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField, RadioButtonGroup } from 'redux-form-material-ui';
import Checkbox from 'material-ui/Checkbox';
import { RadioButton } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Editor, EditorState } from 'draft-js';
import BoldrEditor from 'shared/components/org.BoldrEditor';

const style = {
  block: {
    maxWidth: 250
  },
  toggle: {
    marginBottom: 16
  },
  margin: 12
};
const radioStyle = {
  display: 'inline',
  marginTop: '20px',
  float: 'right'
};
class NewArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => this.setState({ editorState });
  }

  render() {
    const { handleSubmit } = this.props;
    const { editorState } = this.state;
    return (
      <form onSubmit={ handleSubmit }>
        <div className="row">
          <div className="col-md-6">
            <Field name="title" component={ TextField } hintText= "Give it a name" floatingLabelText="Title" />
          </div>
          <div className="col-md-6">
            <Field name="tags" component={ TextField } hintText= "Separate using a comma" floatingLabelText="Tags" />
          </div>
        </div>
        <div>
          <Field name="content" component={ props =>
            <BoldrEditor editorState={ editorState } onChange={ this.onChange } { ...props } />
          } />

        </div>
        <div className="row">
          <div className="col-md-offset-8 col-md-4">
            <Field name="status" component={ RadioButtonGroup } style={ radioStyle }>
              <RadioButton value="draft" label="Draft" />
              <RadioButton value="published" label="Publish" />
            </Field>
          </div>
        </div>
        <div>
          <RaisedButton type="submit" secondary label="Publish" style={ style } />
        </div>
    </form>
      );
  }
}

export default reduxForm({
  form: 'NewArticleForm'
})(NewArticleForm);

NewArticleForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};
