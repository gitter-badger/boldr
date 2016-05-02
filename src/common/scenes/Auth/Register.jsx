import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { RegisterForm } from '../../forms';

class Register extends Component {
  render() {
    return (

      <Paper zDepth={ 1 }>
        <RegisterForm onSubmit={ this.props.onSubmit } />
      </Paper>
    );
  }
}

export default Register;
