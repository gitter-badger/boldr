import { RegisterForm } from 'common/forms';
// import Login from './Login';
import { authRegister } from 'common/state/modules/auth/auth.actions';
import { reduxForm } from 'redux-form';

function validate(values) {
  const errors = {};
  let hasErrors = false;
  if (!values.email || values.email.trim() === '') {
    errors.email = 'Enter an email';
    hasErrors = true;
  }
  if (!values.password || values.password.trim() === '') {
    errors.password = 'Enter a password';
    hasErrors = true;
  }
  return hasErrors && errors;
}

// For any field errors upon submission (i.e. not instant check)
const validateAndRegisterUser = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(authRegister(values));
  });
};

const mapDispatchToProps = (dispatch) => {
  return {
    authRegister: validateAndRegisterUser,
    resetMe: () => {
      // sign up is not reused, so we dont need to resetUserFields
      // in our case, it will remove authenticated users
      // dispatch(resetUserFields());
    }
  };
};


function mapStateToProps(state, ownProps) {
  return {
    auth: state.auth
  };
}


// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'RegisterForm',
  fields: ['email', 'password'],
  validate
}, mapStateToProps, mapDispatchToProps)(RegisterForm);
