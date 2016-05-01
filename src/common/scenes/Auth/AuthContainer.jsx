import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import { LoginForm } from 'common/forms';
import { authLogin, authRegister, toggleLoginMode } from 'common/redux/modules/auth/auth.actions';

@connect(mapStateToProps)
class AuthContainer extends Component {
  constructor(props) {
    super(props);
    this.toggleMode = this.toggleMode.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  handleOnSubmit(event) {
    event.preventDefault();

    const { dispatch, auth: { isAuthenticated } } = this.props;
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;

    if (isAuthenticated) {
      dispatch(authLogin({
        email,
        password
      }));
    } else {
      dispatch(authRegister({
        email,
        password
      }));
    }
  }

  toggleMode() {
    this.props.dispatch(toggleLoginMode());
  }
  renderHeader() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      return (
        <div className="header">
          <h1 className="heading">Login with Email</h1>
          <div className="alternative">
            Not what you want?
            <a className="alternative-link"
              onClick={this.toggleMode}> Register an Account</a>
          </div>
        </div>
      );
    }

    return (
       <div className="header">
      <h1 className="heading">Register with Email</h1>
        <div className="alternative">
          Already have an account?
        <a className="alternative-link"
            onClick={this.toggleMode}> Login</a>
        </div>
      </div>
    );
  }
  render() {
    const { isWaiting, message, isAuthenticated } = this.props.auth;

    return (
      <div>
      { this.renderHeader() }
       <div className="container">
       <LoginForm />
        <div className="email">
            <form onSubmit={this.handleOnSubmit}>
              <input className="input"
              type="email"
              ref="email"
              placeholder="email" />
              <input className="input"
              type="password"
              ref="password"
              placeholder="password" />

              <input className="button"
                type="submit"
                value={isAuthenticated ? 'Login' : 'Register'} />
            </form>
          </div>
       </div>
      </div>
    );
  }
}

AuthContainer.propTypes = {
  auth: React.PropTypes.object,
  user: React.PropTypes.object,
  dispatch: React.PropTypes.func
};


function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.user
  };
}

export default AuthContainer;
