import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import routes from 'common/routes';

function Root(props) {
  const { history, store } = props;
  return (
    <Provider store={ store }>
      <div className="app">
        <Router history={ history } routes={ routes } />
      </div>
    </Provider>
  );
}

Root.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

export default Root;
