import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pages from './Pages';
class PagesContainer extends Component {
  render() {
    return (
      <div>
       <div className="container">
       hi
       </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, null)(PagesContainer);
