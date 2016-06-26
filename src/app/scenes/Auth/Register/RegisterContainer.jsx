import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Card, CardHeader } from 'material-ui/Card';
import { bindActionCreators } from 'redux';
import RegisterForm from '../org.Forms/RegisterForm';
import { registerUser } from 'state/auth/auth';

class RegisterContainer extends Component {

  handleFormSubmit(formProps) {
    this.props.registerUser(formProps);
  }

  render() {
    return (
      <div>
      <Helmet title="Register" />
      <Card>
        <CardHeader
          title="Register"
          subtitle="Geting an account is easy"
          actAsExpander={ false }
          showExpandableButton={ false }
        />
          <RegisterForm onSubmit={ ::this.handleFormSubmit } />
        </Card>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.user.error };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ registerUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);

RegisterContainer.propTypes = {
  registerUser: PropTypes.func.isRequired
};
