import React, { PropTypes, Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import { reduxForm } from 'redux-form';

export const fields = ['sitename', 'url', 'analyticsId', 'logo'];

export const GeneralForm = (props) => {
  const { fields: { sitename, url, analyticsId, logo }, handleSubmit,
      resetForm, submitting } = props;
  const inlineStyle = {
    display: 'flex',
    float: 'right',
    paddingTop: '30px'
  };
  const submitStyle = {
    marginLeft: '20px'
  };

  return (
    <div>
      <form onSubmit={ props.handleSubmit }>
        <div>
        <TextField
          hintText="What is the name of your website?"
          floatingLabelText="Site name"
          underlineShow={ false }
          fullWidth
          {...sitename}
        />
        <Divider />
      </div>
      <div>
      <TextField
        hintText="What is your website's address?"
        floatingLabelText="Site URL"
        fullWidth
        underlineShow={ false }
        {...url}
      />
      <Divider />
      </div>
      <div>
      <TextField
        hintText="It looks like UA-010302"
        floatingLabelText="Google Analytics Id"
        fullWidth
        underlineShow={ false }
        {...url}
      />
      <Divider />
      </div>
      <div>
      <TextField
        hintText="File picker coming soon..."
        floatingLabelText="Logo"
        fullWidth
        underlineShow={ false }
        {...logo}
      />
      <Divider />
      </div>
      <div style={ inlineStyle }>
          <FlatButton disabled={ submitting } onTouchTap={ resetForm }>
          Cancel
          </FlatButton>
          <RaisedButton onTouchTap={ props.handleSubmit } style={ submitStyle } disabled={ submitting }>
            { submitting ? <i /> : <i /> } Save
          </RaisedButton>
        </div>
      </form>
    </div>
    );
};

GeneralForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'generalForm',
  fields
})(GeneralForm);
