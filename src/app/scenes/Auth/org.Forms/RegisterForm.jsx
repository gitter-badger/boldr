import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { CardActions, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {
  TextField
} from 'redux-form-material-ui';

const validate = values => {
  const errors = {};
  const requiredFields = ['firstname', 'email', 'password'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required field';
    }
  });
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

const RegisterForm = props => {
  const { handleSubmit } = props;
  return (
      <form onSubmit={ handleSubmit }>
      <CardText>
        <div>
        <Field name="email" component={ TextField } hintText="Enter your email address"
          floatingLabelText="Email"
        />
        </div>
        <div>
        <Field name="password" type="password" floatingLabelText="Password"
          hintText="Enter your password" component={ TextField }
        />
        </div>
        <div>
          <Field name="firstname" floatingLabelText="First Name" component={ TextField } />
        </div>
        </CardText>
           <CardActions>
             <RaisedButton secondary type="submit" label="Create account" />
          </CardActions>
      </form>
    );
};

export default reduxForm({
  form: 'register',
  validate
})(RegisterForm);

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool
};
