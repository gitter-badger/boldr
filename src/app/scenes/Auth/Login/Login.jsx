import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { authLogin } from 'app/state/modules/auth/auth.actions';
import LoginForm from './LoginForm';

const styles = {
  minHeight: 'calc(100vh - 100px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
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
    <div style={styles}>
      <Paper zDepth={ 1 }>
        <LoginForm onSubmit={ this.handleSubmit } />
      </Paper>
      </div>
      );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default Login;
