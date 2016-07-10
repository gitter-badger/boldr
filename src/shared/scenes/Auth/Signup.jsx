/* @flow */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import SignupForm from './components/atm.SignupForm';
import { signUp } from 'state/modules/user';

type Props = {
  user: Object,
  signUp: Function,
  handleOnSubmit: Function
};

class Signup extends Component {
  props: Props;

  handleOnSubmit(event, formProps) {
    event.preventDefault();

    const { signUp } = this.props;
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;
    const name = ReactDOM.findDOMNode(this.refs.name).value;
    signUp({ email, password, name });
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
          <p>{message}</p>

          <form onSubmit={::this.handleOnSubmit}>
            <input
              type="email"
              ref="email"
              placeholder="email" />
            <input
              type="password"
              ref="password"
              placeholder="password" />
            <input
              type="text"
              ref="name"
              placeholder="Name" />
            <input
              type="submit"
              value="Sign up" />
          </form>

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
