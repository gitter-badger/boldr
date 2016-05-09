import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';

@connect(selector)
class LoginForm extends Component {
  render() {
    const { fields: { email, password }, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.props.authLogin.bind(this))}>
        <div>
          <TextField type="email" floatingLabelText="Email" { ...email } />
        </div>
        <div className={`form-group ${password.touched && password.invalid ? 'has-error' : ''}`}>
           <TextField type="password" floatingLabelText="Password" { ...password } />
        <div className="help-block">
            {password.touched ? password.error : ''}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

const selector = (state) => ({ auth: state.auth });

export default LoginForm;
