import React, { PropTypes } from 'react';

import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import Loader from '../Loader';

// import '../../styles/components/_publishingBar.scss';
const styles = {
  block: {
    maxWidth: 250
  },
  toggle: {
    marginBottom: 16
  }
};

const PublishingControls = (props) => (
    <div className="publishing-bar">
      {
        props.showPublishButton ?
            <div className="publish-section">
                  <Toggle
                    label="Public"
                    style={ styles.toggle }
                    action={ (e) => props.publish(e) }
                  />
            </div>
            : '' }
      <FlatButton label="Save" primary onClick={ (e) => props.sanitize(e) } />
      { props.loading ? <Loader /> : '' }
    </div>
);

PublishingControls.propTypes = {
  loading: PropTypes.bool.isRequired,
  sanitize: PropTypes.func.isRequired,
  publish: PropTypes.func.isRequired,
  showPublishButton: PropTypes.bool.isRequired
};

export default PublishingControls;
