import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12
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

const RegisterForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
      <div style={ styles }>
        <Card style={ cardStyle }>
          <CardTitle title="Register an account" />
            <form onSubmit={ handleSubmit }>
              <div>
              <Field name="email" component={ email =>
                <TextField hintText = "Email"
                  floatingLabelText="Email"
                  errorText = { email.touched && email.error }
                  { ...email }
                />
                }
              />
              </div>
              <div>
              <Field name="username" component={ username =>
                <TextField hintText = "Username"
                  floatingLabelText="Username"
                  errorText = { username.touched && username.error }
                  { ...username }
                />
                }
              />
              </div>
              <div>
              <Field name="password" component={ password =>
                <TextField hintText = "****"
                  type="password"
                  floatingLabelText="Password"
                  errorText = { password.touched && password.error }
                  { ...password }
                />
                }
              />
              </div>
                 <CardActions>
                  <RaisedButton label="Register" type="submit"
                    secondary disabled={ pristine || submitting } style={ style }
                  />
                </CardActions>
            </form>
          </Card>
      </div>
    );
};

const selector = (state) => ({ auth: state.auth });

export default RegisterForm;
