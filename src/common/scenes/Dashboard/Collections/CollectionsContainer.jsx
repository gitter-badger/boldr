import React, { Component } from 'react';
import { connect } from 'react-redux';
import Collections from './Collections';

class CollectionsContainer extends Component {
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

export default connect(mapStateToProps, null)(CollectionsContainer);
