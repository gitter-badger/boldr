/* @flow */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Flex, Box } from 'reflexbox';
import { Card, CardHeader } from 'material-ui/Card';
import { Link } from 'react-router';
import { manualLogin } from 'state/modules/user';
import LoginForm from './components/atm.LoginForm';

type Props = {
  user: Object,
  manualLogin: Function,
  handleOnSubmit: Function
};

class Login extends Component {

  props: Props;

  handleOnSubmit(values) {
    const { manualLogin } = this.props;
    manualLogin({ email: values.email, password: values.password });
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
        <Flex auto>
          <Helmet title="Login" />
          <Box col={ 5 }>
            <Card className="auth-login__card">
              { this.renderHeader() }
              <div>
                <p>{ message }</p>
                <LoginForm onSubmit={ ::this.handleOnSubmit } />

                <a href="/api/v1/auth/facebook">Login with Facebook</a>
              </div>
            </Card>
          </Box>
        </Flex>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user
  };
}

export default connect(mapStateToProps, { manualLogin })(Login);
