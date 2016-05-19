import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

const style = {
  margin: 12
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
@connect(selector)
class LoginForm extends Component {
  render() {
    const { fields: { email, password }, handleSubmit } = this.props;
    return (
      <div style={ styles }>
      <Card style={ cardStyle }>
        <CardTitle title="Login" />
          <form onSubmit={handleSubmit(this.props.authLogin.bind(this))}>
            <div>
              <TextField type="email" floatingLabelText="Email" { ...email } />
            </div>
            <div className={`form-group ${password.touched && password.invalid ? 'has-error' : ''}`}>
               <TextField type="password" floatingLabelText="Password" { ...password } />
            <div className="help-block">
                {password.touched ? password.error : ''}
              </div>
            </div>
            <CardActions>
             <RaisedButton label="Login" type="submit" secondary={true} style={style} />
           </CardActions>
       </form>
       </Card>
      </div>
    );
  }
}

const selector = (state) => ({ auth: state.auth });

export default LoginForm;
