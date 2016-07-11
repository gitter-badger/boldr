import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderField from 'components/atm.RenderField';
import MenuItem from 'material-ui/MenuItem';
import { RadioButton } from 'material-ui/RadioButton';
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle
} from 'redux-form-material-ui';

const SetupFormPage2 = (props) => {
  const { handleSubmit, previousPage } = props;
  return (
    <form onSubmit={ handleSubmit }>
      <Field name="description" component={ TextField } hintText="Description of the website" />
      <Field name="logo" component={ TextField } hintText="Site logo" />

      <Field name="favicon" component={ TextField } hintText="Favicon" />
      <Field name="analyticsId" component={ TextField } hintText="Google Analytics ID" />
      <Field name="allowRegistration" component={ Toggle } label="Allow anyone to register an account?" />
      <div>
        <button type="button" className="previous" onClick={ previousPage }>Previous</button>
        <button type="submit" className="next">Next</button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'SetupForm',
  destroyOnUnmount: false
})(SetupFormPage2);
