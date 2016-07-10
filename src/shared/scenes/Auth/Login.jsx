/* @flow */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Card, CardHeader } from 'material-ui/Card';
import { Link } from 'react-router';
import { manualLogin } from 'state/modules/user';

type Props = {
  user: Object,
  manualLogin: Function,
  handleOnSubmit: Function
};

class Login extends Component {

  props: Props;

  handleOnSubmit(event) {
    event.preventDefault();

    const { manualLogin } = this.props;
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;
    manualLogin({ email, password });
  }
  renderHeader() {
    return (
      <div>
        <CardHeader
          title="Log in"
          actAsExpander={ false }
          showExpandableButton={ false }
        />
        <div>
          Not what you want?
          <Link to="/signup"> Register an Account</Link>
        </div>
      </div>
    );
  }

  render() {
    const { isLoading, message } = this.props.user;

    return (
        <div>
          <Helmet title="Login" />
          <Card className="auth-login__card">
            { this.renderHeader() }
            <div>
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
                  type="submit"
                  value="Login" />
              </form>
               <a href="/api/v1/auth/facebook">Login with Facebook</a>
            </div>
          </Card>
        </div>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user
  };
}

export default connect(mapStateToProps, { manualLogin })(Login);
