import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {
  TextField
} from 'redux-form-material-ui';

const style = {
  margin: 12
};

const LoginForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
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
        </CardText>
           <CardActions>
             <RaisedButton secondary type="submit" label="Login" disabled={ pristine || submitting } />
             <FlatButton disabled={ pristine || submitting } label="Reset" onTouchStart={ reset } />
          </CardActions>
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
