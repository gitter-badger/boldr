import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderField from 'components/atm.RenderField';
import MenuItem from 'material-ui/MenuItem';
import { RadioButton } from 'material-ui/RadioButton';
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle
} from 'redux-form-material-ui';
import Heading from 'components/atm.Heading';

const SetupFormPage3 = (props) => {
  const { handleSubmit, previousPage } = props;
  return (
    <form onSubmit={ handleSubmit }>
      <Heading size={ 1 }>Temporarily empty placeholder page. Click the button below to finish</Heading>
      <div>
        <button type="button" className="previous" onClick={ previousPage }>Previous</button>
        <button type="submit" className="next">Save Settings</button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'SetupForm',
  destroyOnUnmount: false
})(SetupFormPage3);
