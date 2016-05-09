import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Register from './Register.jsx';
import LoginContainer from './LoginContainer.jsx';
import { authLogin, authRegister, toggleLoginMode } from 'common/state/modules/auth/auth.actions';

@connect(mapStateToProps)
class AuthContainer extends Component {
  constructor(props) {
    super(props);
    this.toggleMode = this.toggleMode.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(event) {
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
  renderLoginReg() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      return (
        <div className="header">
          <h1 className="heading">Login with Email</h1>
          <LoginContainer />
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
         <Register onSubmit={ this.handleOnSubmit } />
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
       <div className="container">
          { this.renderLoginReg() }
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
