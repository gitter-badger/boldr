import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

@connect(selector)
class LoginForm extends Component {
  render() {
    const { fields: { email, password }, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" placeholder="Email" {...email}/>
        </div>
        <div>
          <label>Password</label>
          <input type="text" placeholder="Last Name" {...password}/>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

const selector = (state) => ({ auth: state.auth });

LoginForm = reduxForm({
  form: 'login',
  fields: ['email', 'password']
})(LoginForm);

export default LoginForm;
