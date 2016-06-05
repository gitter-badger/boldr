import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
// require images like const logoImage = require('./image.jpg') so the server picks it up too
const HomeContainer = () => {
  return (
    <div>
    <Helmet title="Home" />
       <div className="container">
        HEY THIS IS HOME
       </div>
      </div>
  );
};

export default HomeContainer;
