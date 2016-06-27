import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Snackbar from 'material-ui/Snackbar';
import TopBar from 'shared/mol.TopBar';
// import Footer from 'shared/mol.Footer';
import { checkTokenValidity } from 'state/auth/auth';
import meta from 'app/utils.rendering/meta';
import 'app/styles/app.scss';

class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    snack: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.dispatch(checkTokenValidity);
  }
  handleSnackClose() {
    this.props.closeSnack();
  }
  render() {
    return (
      <div>
        <Helmet { ...meta.app.head } />
        <TopBar />
        <div className="wrap container-flud">
          { this.props.children }

          <Snackbar
            open={ this.props.snack.open }
            message={ this.props.snack.message ?
              <div id={ `snack.${this.props.snack.message}` }>{ this.props.snack.name } </div> : '' }
            onRequestClose={ ::this.handleSnackClose }
            autoHideDuration={ 5000 }
          />
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    routing: state.routing,
    boldr: state.boldr,
    snack: state.boldr.snack
  };
}

export default connect(mapStateToProps)(CoreLayout);
