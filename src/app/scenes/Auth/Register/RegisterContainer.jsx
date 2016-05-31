import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { manualLogin, signUp, toggleLoginMode } from 'app/state/user/user.actions';
const style = {
  margin: 12,
  align: 'right'
};
const styles = {
  minHeight: 'calc(100vh - 100px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
const cardStyle = {
  minWidth: 'calc(33vw)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
class LoginOrRegister extends Component {
  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(event) {
    event.preventDefault();

    const { manualLogin, signUp, user: { isLogin } } = this.props;
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;

    if (isLogin) {
      manualLogin({ email, password });
    } else {
      signUp({ email, password });
    }
  }

  renderHeader() {
    const { user: { isLogin }, toggleLoginMode } = this.props;
    if (isLogin) {
      return (
        <div>
        <CardTitle title="Login to your account" />
          <div>
            Not what you want?
            <a onClick={ toggleLoginMode }> Register an Account</a>
          </div>
        </div>
      );
    }

    return (
      <div>
        <CardTitle title="Register an account" />
        <div>
          Already have an account?
          <a onClick={ toggleLoginMode }> Login</a>
        </div>
      </div>
    );
  }

  render() {
    const { isWaiting, message, isLogin } = this.props.user;

    return (
      <div style={ styles }>
        <Card style={ cardStyle }>
        <div>
          { this.renderHeader() }

          <div>
            <form onSubmit={ this.handleOnSubmit }>
            <TextField
              hintText="Enter your email"
              fullWidth
              ref="email"
              floatingLabelText="Email"
            />
            <TextField
              fullWidth
              hintText="Enter your password"
              ref="password"
              floatingLabelText="Password"
            />
              <p>{ message }</p>
              <CardActions>
               <RaisedButton label={ isLogin ? 'Login' : 'Register' }
                 type="submit" secondary style={ style }
               />
             </CardActions>
            </form>
          </div>
        </div>
        </Card>
      </div>
    );
  }
}

LoginOrRegister.propTypes = {
  user: PropTypes.object,
  manualLogin: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  toggleLoginMode: PropTypes.func.isRequired
};

function mapStateToProps({ user }) {
  return {
    user
  };
}

export default connect(mapStateToProps, { manualLogin, signUp, toggleLoginMode })(LoginOrRegister);
