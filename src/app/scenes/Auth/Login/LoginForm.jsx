import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

const style = {
  margin: 12,
  align: 'right'
};
const styles = {
  minHeight: 'calc(100vh - 100px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
const cardStyle = {
  minWidth: 'calc(33vw)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
const LoginForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
      <div style={ styles }>
      <Card style={ cardStyle }>
        <CardTitle title="Login" />
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

      <CardActions>
       <RaisedButton label="Login" type="submit" secondary style={ style } />
     </CardActions>
    </form>
       </Card>
      </div>
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
