import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deleteAlert } from 'state/alert/alert';

export default function(ComposedComponent) {
  function mapStateToProps(state) {
    return {
      hasAlert: state.alert.hasAlert,
      message: state.alert.message,
      kind: state.alert.kind
    };
  }

  class Alert extends Component {
    static propTypes = {
      deleteAlert: PropTypes.func.isRequired,
      hasAlert: PropTypes.bool,
      message: PropTypes.string,
      kind: PropTypes.string
    }
    componentWillMount() {
      this.deleteAlertIfNeeded(this.props);
    }

    componentWillReceiveProps(nextProps) {
      this.deleteAlertIfNeeded(nextProps);
    }

    deleteAlertIfNeeded(props) {
      if (props.hasAlert) {
        setTimeout(() => {
          this.props.deleteAlert();
        }, 1500);
      }
    }

    render() {
      if (this.props.hasAlert) {
        return (
          <div>
            <div className="alert">
              { this.props.message }
            </div>
            <ComposedComponent { ...this.props } />
          </div>
        );
      } else {
        return <ComposedComponent { ...this.props } />;
      }
    }
  }

  return connect(mapStateToProps, { deleteAlert })(Alert);
}
