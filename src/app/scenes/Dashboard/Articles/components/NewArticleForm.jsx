import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField, RadioButtonGroup } from 'redux-form-material-ui';
import Checkbox from 'material-ui/Checkbox';
import { RadioButton } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import BEditor from 'app/components/Editor/BoldrEditor';

const style = {
  block: {
    maxWidth: 250
  },
  toggle: {
    marginBottom: 16
  },
  margin: 12
};
class NewArticleForm extends Component {
  constructor(props) {
    super(props);

    this.onChange = (value) => {
      this.setState({
        value
      });
    };

    this.getMarkup = (markup) => {
      this.setState({
        markup
      });
    };

    this.renderInnerMarkup = () => this._renderInnerMarkup();
    this.renderReturnedContent = (value) => this._renderReturnedContent(value);

    this.state = {
    };
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={ handleSubmit }>
      <div>
      <Field name="title" component={ TextField } hintText= "Give it a name" floatingLabelText="Title" />

      </div>
      <div>
      <Field name="slug" component={ TextField } hintText= "This will be used as the URL" floatingLabelText="Slug" />

      </div>
      <div>
      <Field name="tags" component={ TextField } hintText= "Separate using a comma" floatingLabelText="Tags" />
      </div>
      <div>

      <Field name="content" component={ props =>
        <BEditor placeholder="Write your content..." {...props} />
        }
      />
      </div>
      <Field name="status" component={ RadioButtonGroup }>
        <RadioButton value="draft" label="Draft" />
        <RadioButton value="published" label="Publish" />
      </Field>
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
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired
};
