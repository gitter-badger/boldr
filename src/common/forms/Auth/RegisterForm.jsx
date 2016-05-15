import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';

@connect(selector)
class RegisterForm extends Component {
  render() {
    const { fields: {
      email, username, location, bio, avatar, website, firstName, lastName, password
    }, handleSubmit } = this.props;
    return (
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
        <button type="submit">Submit</button>
      </form>
    );
  }
}

const selector = (state) => ({ auth: state.auth });

export default RegisterForm;
