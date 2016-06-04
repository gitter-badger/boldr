require('dotenv').config({ silent: true });
import { install } from 'source-map-support';
import WebpackIsomorphicTools from 'webpack-isomorphic-tools';
import isomorphicToolsConfig from '../../tools/webpack/isomorphic.tools.config';
import boldrConfig from 'config';
import paths from 'config/paths';
install();
const projectBasePath = paths.ROOT_DIR;

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEV__ = boldrConfig.__DEV__;
global.__PROD__ = boldrConfig.__PROD__;
global.__DEBUG__ = boldrConfig.__DEBUG__;

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools#mainjs
global.webpackIsomorphicTools =
  new WebpackIsomorphicTools(isomorphicToolsConfig)
    .development(__DEV__)
    .server(projectBasePath, () => {
      require('./server');
    });
