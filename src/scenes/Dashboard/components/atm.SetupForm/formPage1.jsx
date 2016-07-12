import React from 'react';
import { reduxForm } from 'redux-form';
import { Flex, Box } from 'reflexbox';
import RaisedButton from 'material-ui/RaisedButton';
import RenderField from 'components/atm.RenderField';
import Heading from 'components/atm.Heading';
import BoldrLogo from 'components/atm.BoldrLogo';

export const fields = ['siteName', 'siteUrl'];

const SetupFormPage1 = (props) => {
  const { fields: { siteName, siteUrl }, handleSubmit } = props;
  return (
    <Flex>
      <Box p={ 4 } col={ 7 } align="flex-start">
        <Heading size={ 1 }>Welcome to <BoldrLogo width="150" /> Boldr</Heading>
      </Box>
      <Box col={ 5 } align="flex-end">
        <Flex align="baseline">
          <Heading size={ 2 }>Please answer a few questions in order to setup your site.</Heading>
        </Flex>
        <Flex align="baseline">
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
        </Flex>
      </Box>
      </Flex>
      );
};

export default reduxForm({
  form: 'SetupForm',
  fields,
  destroyOnUnmount: false
})(SetupFormPage1);
