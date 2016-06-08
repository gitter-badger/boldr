import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { bindActionCreators } from 'redux';
import RegisterForm from './RegisterForm';
import { signUp } from 'state/user/user.actions';

class RegisterContainer extends Component {

  handleFormSubmit(formProps) {
    // Call action creator to sign up user (properties with no errors)
    this.props.signUp(formProps);
  }

  render() {
    const { handleSubmit } = this.props;

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
  return bindActionCreators({ signUp }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);

RegisterContainer.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired
};
