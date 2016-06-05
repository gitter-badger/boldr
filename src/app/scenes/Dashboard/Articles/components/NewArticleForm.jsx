import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
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
  handleChange = (event, index, value) => this.setState({value});
  render() {
    const { handleSubmit, fields: { title, slug, content, status } } = this.props;
    return (
      <form onSubmit={ handleSubmit }>
      <div>

          <TextField hintText= "Give it a name"
            floatingLabelText="Title"
            fullWidth
            errorText = { title.touched && title.error }
            { ...title }
          />

      </div>
      <div>

          <TextField hintText= "This will be used as the URL"
            floatingLabelText="Slug"
            fullWidth
            errorText = { slug.touched && slug.error }
            { ...slug }
          />

      </div>
      <div>

        <BEditor placeholder="Write your content..."
          { ...content }
        />
      </div>
      <label>
            <input type="radio" { ...status } value="draft" checked={ status.value === 'draft' } /> Draft
          </label>
          <label>
            <input type="radio" { ...status } value="published" checked={ status.value === 'published' } /> Published
          </label>
      <div>
        <RaisedButton type="submit" secondary label="Publish" style={ style } />
      </div>
    </form>
      );
  }
}

export default reduxForm({
  form: 'NewArticleForm',
  fields: ['title', 'slug', 'content', 'status']
}, null, null)(NewArticleForm);

NewArticleForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired
};
