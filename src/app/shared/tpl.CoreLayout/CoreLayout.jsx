import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import TopBar from 'shared/mol.TopBar';
// import Footer from 'shared/mol.Footer';
import { checkTokenValidity } from 'state/auth/auth';
import meta from 'app/utils.ssr/meta';
import { LayoutContainer } from 'shared/index';

import 'app/styles/app.scss';

class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.dispatch(checkTokenValidity);
  }

  render() {
    return (
      <div>
        <Helmet { ...meta.app.head } />
        <TopBar />
        <LayoutContainer>
          { this.props.children }
        </LayoutContainer>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    routing: state.routing,
    boldr: state.boldr
  };
}

export default connect(mapStateToProps)(CoreLayout);
