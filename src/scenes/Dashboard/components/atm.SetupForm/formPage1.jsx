import React from 'react';
import { reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import RenderField from 'components/atm.RenderField';
import Heading from 'components/atm.Heading';
import BoldrLogo from 'components/atm.BoldrLogo';
import { Col, Row, Container } from 'components/index';

export const fields = ['siteName', 'siteUrl'];

const SetupFormPage1 = (props) => {
  const { fields: { siteName, siteUrl }, handleSubmit } = props;
  return (
    <Row>
      <Col>
        <Heading size={ 1 }>Welcome to <BoldrLogo width="150" /> Boldr</Heading>
      </Col>
      <Col col={ 5 } align="flex-end">
        <Heading size={ 2 }>Please answer a few questions in order to setup your site.</Heading>
        <form onSubmit={ handleSubmit }>
          <input type="text" { ...siteName } />
          <input type="text" { ...siteUrl } />
          <div>
            <RaisedButton
              label="Next"
              type="submit"
            />
          </div>
        </form>
      </Col>
    </Row>
      );
};

export default reduxForm({
  form: 'SetupForm',
  fields,
  destroyOnUnmount: false
})(SetupFormPage1);
