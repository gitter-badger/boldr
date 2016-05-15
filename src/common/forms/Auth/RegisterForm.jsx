import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
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

@connect(selector)
class RegisterForm extends Component {
  render() {
    const { fields: {
      email, username, location, bio, avatar, website, firstName, lastName, password
    }, handleSubmit } = this.props;
    return (
      <div style={ styles }>
        <Card style={ cardStyle }>
          <CardTitle title="Register an account" />
            <form onSubmit={handleSubmit(this.props.authLogin.bind(this))}>
              <div>
                <TextField type="email" floatingLabelText="Email" { ...email } />
              </div>
              <div>
                <TextField type="text" floatingLabelText="Username" { ...username } />
              </div>
                <div className={`form-group ${password.touched && password.invalid ? 'has-error' : ''}`}>
                 <TextField type="password" floatingLabelText="Password" { ...password } />
                   <div className="help-block">
                      { password.touched ? password.error : '' }
                  </div>
                </div>
                <div>
                  <TextField type="text" floatingLabelText="First Name" { ...firstName } />
                </div>
                <div>
                  <TextField type="text" floatingLabelText="Last Name" { ...lastName } />
                </div>
                <div>
                  <TextField type="text" floatingLabelText="Location" { ...location } />
                </div>
                <div>
                  <TextField type="text" floatingLabelText="Avatar" { ...avatar } />
                </div>
                <div>
                  <TextField type="text" floatingLabelText="Website" { ...website } />
                </div>
                <div>
                  <TextField multiLine type="text" floatingLabelText="Bio" { ...bio } />
                </div>
                 <CardActions>
                  <RaisedButton label="Register" type="submit" secondary={true} style={style} />
                </CardActions>
            </form>
          </Card>
      </div>
    );
  }
}

const selector = (state) => ({ auth: state.auth });

export default RegisterForm;
