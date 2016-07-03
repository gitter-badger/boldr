import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Card, CardHeader } from 'material-ui/Card';
import { bindActionCreators } from 'redux';
import RegisterForm from '../org.Forms/RegisterForm';
import { registerUser } from 'state/auth/auth';

function mapStateToProps(state) {
  return { errorMessage: state.user.error };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ registerUser }, dispatch);
};

@connect(mapStateToProps, mapDispatchToProps)
class RegisterContainer extends Component {

  handleFormSubmit(formProps) {
    this.props.registerUser(formProps);
  }

  render() {
    return (
      <div>
      <Helmet title="Register" />
      <div className="col-md-8">
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
        </div>
    );
  }
}

export default RegisterContainer;

RegisterContainer.propTypes = {
  registerUser: PropTypes.func.isRequired
};
