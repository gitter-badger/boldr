import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import BoldrEditor from 'app/components/BoldrEditor/BoldrEditor';
const style = {
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

        <BoldrEditor placeholder="Write your content..."
          value={ this.state.value }
          onValueChange={ this.onChange }
          returnHTML={ this.getMarkup }
          { ...content }
        />

      </div>
      <div>
        <RaisedButton type="submit" secondary label="Publish" style={ style } />

      </div>
    </form>
      );
  }
}

export default reduxForm({
  form: 'NewArticleForm',
  fields: ['title', 'slug', 'content']
}, null, null)(NewArticleForm);

NewArticleForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired
};
