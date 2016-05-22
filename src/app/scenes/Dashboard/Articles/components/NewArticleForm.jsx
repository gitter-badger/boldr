import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import BoldrEditor from 'app/components/Editor';

const NewArticleForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="title" component={ title =>
          <TextField hintText= "Give it a name"
            floatingLabelText="Title"
            errorText = { title.touched && title.error }
            { ...title }
          />
          }/>
      </div>
      <div>
        <Field name="slug" component={ slug =>
          <TextField hintText= "This will be used as the URL"
            floatingLabelText="Slug"
            errorText = { slug.touched && slug.error }
            { ...slug }
          />
          }/>
      </div>
      <div>
      <Field name="content" component={ content =>
        <BoldrEditor placeholder="Write your content..." { ...content } />
      }/>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'NewArticleForm'  // a unique identifier for this form
})(NewArticleForm);
