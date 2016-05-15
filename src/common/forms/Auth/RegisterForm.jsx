import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import asyncValidate from './asyncValidate';

const validate = values => {
  const errors = {};
  const requiredFields = ['username', 'firstName', 'email', 'password'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

const RegisterForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <Field name="username" component={ username =>
          <TextField hintText = "Username"
            floatingLabelText="Username"
            errorText = { username.touched && username.error }
            { ...username }
          /> }
        />
      </div>
      <div>
        <Field name="email" component={ email =>
          <TextField
            hintText="Email"
            floatingLabelText="Email"
            errorText = { email.touched && email.error }
            { ...email }
          /> }
        />
      </div>
      <div>
        <Field name="password" type="password" component={ password =>
              <TextField
                hintText = "Password"
                floatingLabelText="Password"
                errorText = { password.touched && password.error }
                { ...password }
              /> }
        />
      </div>
      <div>
        <Field name="firstName" component={ firstName =>
              <TextField
                hintText = "First Name"
                floatingLabelText="First Name"
                errorText = { firstName.touched && firstName.error }
                { ...firstName }
              /> }
        />
      </div>
      <div>
        <Field name="location" component={ location =>
              <TextField
                hintText = "City, State"
                floatingLabelText="Location"
                errorText = { location.touched && location.error }
                { ...location }
              />
            }
        />
      </div>
      <div>
  <Field name="bio" component={ bio =>
       <TextField hintText="Bio"
         multiLine
         rows={ 3 }
         errorText = { bio.touched && bio.error }
         { ...bio }
       />
     }
  />
 </div>
      <div>
        <button type="submit" disabled={ pristine || submitting }>Submit</button>
        <button type="button" disabled={ pristine || submitting } onClick={ reset }>Clear Values
        </button>
      </div>
    </form>
  );
};
RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool
};
export default reduxForm({
  form: 'RegisterForm',  // a unique identifier for this form
  validate,
  asyncValidate
})(RegisterForm);
