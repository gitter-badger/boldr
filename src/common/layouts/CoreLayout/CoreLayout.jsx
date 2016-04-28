import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// *** STYLES *** //
import 'common/styles/app.scss';

/**
 * Core layout is the default layout for the main site. It is a stateless
 * component and will require a full reload. Cannot HMR.
 * @param {any} props everything that will be rendered.
 */
function CoreLayout(props) {
  return (
    <div>
      { props.children }
    </div>
  );
}

CoreLayout.propTypes = {
  children: PropTypes.object.isRequired
};

export default CoreLayout;
