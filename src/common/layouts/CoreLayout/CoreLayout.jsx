import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import TopBar from 'common/components/Topbar';


// *** STYLES *** //
import 'common/styles/app.scss';
const siteName = 'Boldr';
/**
 * Core layout is the default layout for the main site. It is a stateless
 * component and will require a full reload. Cannot HMR.
 * @param {any} props everything that will be rendered.
 */
function CoreLayout(props) {
  return (
    <div>
          <TopBar />
      { props.children }
    </div>
  );
}

CoreLayout.propTypes = {
  children: PropTypes.any
};

export default CoreLayout;
