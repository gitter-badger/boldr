import React, { Component } from 'react';
import { connect } from 'react-redux';
import Collections from './Collections';

@connect(mapStateToProps, null)
export default class CollectionsContainer extends Component {
  render() {
    return (
      <div>
       <div className="container">
       CollectionsContainer
       </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});
