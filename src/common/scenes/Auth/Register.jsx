import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { authRegister } from 'common/state/modules/auth/auth.actions';
import { RegisterForm } from 'common/forms';

class Register extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { dispatch } = this.props;
    dispatch(authRegister(values));
  }
  render() {
    return (

      <Paper zDepth={ 1 }>
        <RegisterForm onSubmit={ this.handleSubmit } />
      </Paper>
    );
  }
}

export default Register;
