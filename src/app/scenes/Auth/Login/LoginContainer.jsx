import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { bindActionCreators } from 'redux';
import LoginForm from 'scenes/Auth/org.Forms/LoginForm';
import { manualLogin } from 'state/user/user.actions';
import BoldrLogo from 'shared/atm.BoldrLogo';

class LoginContainer extends Component {

  handleFormSubmit(formProps) {
    // Call action creator to sign up user (properties with no errors)
    this.props.manualLogin(formProps);
  }

  render() {
    const { handleSubmit } = this.props;

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

function mapStateToProps(state) {
  return { errorMessage: state.user.error };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ manualLogin }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

LoginContainer.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  manualLogin: PropTypes.func.isRequired
};
