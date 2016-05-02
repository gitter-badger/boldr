import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';

import { LoginForm } from '../../forms';


class Login extends Component {
  render() {
    return (
      <Paper zDepth={ 1 }>
        <LoginForm onSubmit={ this.props.onSubmit } />
      </Paper>
    );
  }
}

export default Login;
