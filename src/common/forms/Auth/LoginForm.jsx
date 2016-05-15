import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import asyncValidate from './asyncValidate';

const LoginForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <Field name="email" component={ email =>
              <TextField
                hintText="Email"
                floatingLabelText="Email"
                errorText = { email.touched && email.error }
                { ...email }
              />
            }
        />
      </div>
      <div>
        <Field name="password" type="password" component={ password =>
              <TextField
                hintText="Password"
                floatingLabelText="Password"
                errorText = { password.touched && password.error }
                { ...password }
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
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool
};

export default reduxForm({
  form: 'LoginForm'
})(LoginForm);
