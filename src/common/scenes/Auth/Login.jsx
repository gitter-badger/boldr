import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { authLogin } from 'common/state/modules/auth/auth.actions';
import { LoginForm } from 'common/forms';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { dispatch } = this.props;
    dispatch(authLogin(values));
  }

  render() {
    return (
      <Paper zDepth={ 1 }>
        <LoginForm onSubmit={ this.handleSubmit } />
      </Paper>
      );
  }
}

export default Login;
