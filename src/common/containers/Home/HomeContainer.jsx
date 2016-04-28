import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopBar from 'common/components/TopBar';
// require images like const logoImage = require('./image.jpg') so the server picks it up too
class HomeContainer extends Component {
  render() {
    return (
      <div>
      <TopBar />
       <div className="container">
       Home?
       </div>
      </div>
    );
  }
}

export default HomeContainer;
