import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { bindActionCreators } from 'redux';

import { manualLogin } from 'state/user/user.actions';

class LoginContainer extends Component {

  handleFormSubmit(formProps) {
    // Call action creator to sign up user (properties with no errors)
    this.props.manualLogin(formProps);
  }

  render() {
    const { handleSubmit, fields: { email, password } } = this.props;

    return (
      <Card>
        <CardHeader
          title="Log in"
          actAsExpander={ false }
          showExpandableButton={ false }
        />
        <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
        <CardText>
            <div>
            <TextField
              hintText=""
              floatingLabelText="Email"
              errorText={ email.touched && email.error && <span>{ email.error }</span> }
              {...email}
            />
            </div>
            <div>
              <TextField
                type="password"
                floatingLabelText="Password"
                {...password}
              />
            </div>
            </CardText>
          <CardActions expandable={ false }>
          <RaisedButton secondary type="submit" label="Login" />
          </CardActions>
        </form>
        </Card>
    );
  }
}

// Calls this function on any action on the form (click the field, type, etc..)
function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.user.error };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ manualLogin }, dispatch);
};

export default reduxForm({
  form: 'login',
  fields: ['email', 'password'],
  validate // ES6 - Value and key with same name
}, mapStateToProps, mapDispatchToProps)(LoginContainer);

LoginContainer.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  manualLogin: PropTypes.func.isRequired
};
