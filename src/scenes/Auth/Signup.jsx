/* @flow */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import SignupForm from './components/atm.SignupForm';
import { signUp } from 'state/modules/user';

type Props = {
  user: Object,
  signUp: Function,
  handleOnSubmit: Function
};

class Signup extends Component {
  props: Props;

  handleOnSubmit(values) {
    const { signUp } = this.props;
    signUp({ email: values.email, password: values.password, name: values.name, displayName: values.displayName });
  }

  renderHeader() {
    return (
      <div>
        <h1>Register with Email</h1>
        <div>
          Already have an account?
          <Link to="/login"> Login</Link>
        </div>
      </div>
    );
  }

  render() {
    const { isLoading, message } = this.props.user;

    return (
        <div>
          { this.renderHeader() }
          <p>{ message }</p>

          <SignupForm onSubmit={ ::this.handleOnSubmit } />
        </div>
    );
  }
}

Signup.propTypes = {
  user: PropTypes.object,
  signUp: PropTypes.func.isRequired
};

function mapStateToProps({ user }) {
  return {
    user
  };
}

export default connect(mapStateToProps, { signUp })(Signup);
