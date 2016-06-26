import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Helmet from 'react-helmet';
import TopBar from 'shared/mol.TopBar';
import Footer from 'shared/mol.Footer';
import { checkTokenValidity } from 'state/auth/auth';
import meta from 'app/utils.rendering/meta';
import 'app/styles/app.scss';

class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(checkTokenValidity);
  }

  render() {
    return (
      <div>
        <Helmet { ...meta.app.head } />
        <TopBar />
        <div className="wrap container-flud">
          { this.props.children }
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    router: state.router,
    boldr: state.boldr
  };
}

export default connect(mapStateToProps, null)(CoreLayout);
