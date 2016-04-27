import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// *** STYLES *** //
import 'common/styles/app.scss';

const propTypes = {
  children: PropTypes.object
};

function CoreLayout(props) {
  return (
    <div>
      { props.children }
    </div>
  );
}

CoreLayout.propTypes = propTypes;
export default CoreLayout;
