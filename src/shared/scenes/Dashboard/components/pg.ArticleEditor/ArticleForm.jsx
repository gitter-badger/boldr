import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField, RadioButtonGroup } from 'redux-form-material-ui';
import Checkbox from 'material-ui/Checkbox';
import { RadioButton } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
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
    this.state = { editorState: null };
    this.onChange = ::this.onChange;
  }
  onChange(editorState) {
    this.setState({ editorState });
  }

  render() {
    const { handleSubmit } = this.props;
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
          <BoldrEditor placeholder="Write your story" { ...props } />
          }
        />

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
