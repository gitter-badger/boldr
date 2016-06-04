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
                }/>
              </div>

              <div>
              <Field name="password" component={ password =>
                <TextField hintText = "****"
                  type="password"
                  floatingLabelText="Password"
                  errorText = { password.touched && password.error }
                  { ...password }
                />
                }/>
              </div>
              <div>
                <Field name="firstName" component={ firstName =>
                  <TextField hintText = "First Name"
                    floatingLabelText="First Name"
                    errorText = { firstName.touched && firstName.error }
                    { ...firstName }
                  />
                }/>
              </div>
              <div>
                <Field name="lastName" component={ lastName =>
                      <TextField
                        hintText = "Last Name"
                        floatingLabelText="Last Name"
                        errorText = { lastName.touched && lastName.error }
                        { ...lastName }
                      />
                    }/>
              </div>
              <div>
                <Field name="location" component={ location =>
                      <TextField
                        hintText = "Location"
                        floatingLabelText="Location"
                        errorText = { location.touched && location.error }
                        { ...location }
                      />
                    }/>
              </div>
              <div>
                <Field name="avatar" component={ avatar =>
                      <TextField
                        hintText = "Avatar url"
                        floatingLabelText="Avatar"
                        errorText = { avatar.touched && avatar.error }
                        { ...avatar }
                      />
                    }/>
              </div>
              <div>
                <Field name="website" component={ website =>
                      <TextField
                        hintText = "Website"
                        floatingLabelText="Website"
                        errorText = { website.touched && website.error }
                        { ...website }
                      />
                    }/>
              </div>
              <div>
                <Field name="bio" component={ bio =>
                      <TextField
                        multiLine
                        hintText = "A few words about yourself"
                        floatingLabelText="Bio"
                        errorText = { bio.touched && bio.error }
                        { ...bio }
                      />
                    }/>
              </div>
                 <CardActions>
                <button type="submit">Register</button>
                </CardActions>
            </form>
          </Card>
      </div>
    );
};

const selector = (state) => ({ auth: state.auth });

export default RegisterForm;
