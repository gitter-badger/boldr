import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import Helmet from 'react-helmet';
import Message from 'shared/components/atm.Message';
import TopBar from 'shared/components/mol.TopBar';
import '../../styles/main.scss';
const CoreLayout = ({ children }) => {
  return (
    <div>
      <TopBar />
      <Message />
      { children }
    </div>
  );
};

CoreLayout.propTypes = {
  children: PropTypes.node
};

export default CoreLayout;
