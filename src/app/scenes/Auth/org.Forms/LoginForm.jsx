import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { CardActions, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {
  TextField
} from 'redux-form-material-ui';

const LoginForm = props => {
  const { handleSubmit, reset } = props;
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
             <RaisedButton secondary type="submit" label="Login" />
             <FlatButton label="Reset" onTouchStart={ reset } />
          </CardActions>
      </form>
    );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func,
  submitting: PropTypes.bool
};

export default reduxForm({
  form: 'LoginForm'
})(LoginForm);
