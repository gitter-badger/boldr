import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Card, CardHeader } from 'material-ui/Card';
import { bindActionCreators } from 'redux';
import LoginForm from 'scenes/Auth/org.Forms/LoginForm';
import { loginUser } from 'state/auth/auth';
import BoldrLogo from 'shared/atm.BoldrLogo';

const mapStateToProps = (state) => {
  return { errorMessage: state.auth.error };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ loginUser }, dispatch);
};

@connect(mapStateToProps, mapDispatchToProps)
class LoginContainer extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired
  };

  handleFormSubmit(formProps) {
    this.props.loginUser(formProps);
  }

  render() {
    return (
    <div>
      <Helmet title="Login" />
      <Card>
        <CardHeader
          title="Log in"
          actAsExpander={ false }
          showExpandableButton={ false }
        />
        <BoldrLogo height="100px" width="100px" />
        <LoginForm onSubmit={ ::this.handleFormSubmit } />
        </Card>
    </div>
    );
  }
}

export default LoginContainer;
