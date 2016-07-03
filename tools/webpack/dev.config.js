import webpack from 'webpack';
import path from 'path';
import _debug from 'debug';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import isomorphicToolsConfig from './isomorphic.tools.config';
import boldrCfg from '../../src/config';
import paths from '../../src/config/paths';
import BABEL_LOADER from './loaders/babel';
import NpmInstallPlugin from 'npm-install-webpack-plugin';

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(isomorphicToolsConfig);
const debug = _debug('app:webpack:config:dev');
const scssConfigIncludePaths = [paths.APP_DIR];
const cssChunkNaming = '[name]__[local]___[hash:base64:5]';
const VENDOR_DEPENDENCIES = [
  'react',
  'react-dom',
  'redux-thunk',
  'react-redux',
  'react-router',
  'react-router-redux',
  'material-ui',
  'redux',
  'lodash',
  'classnames',
  'axios',
  'react-router-scroll',
  'redux-form',
  'react-tap-event-plugin'
];
const cssLoader = [
  'css?modules',
  'sourceMap',
  'importLoaders=2',
  `localIdentName=${cssChunkNaming}`
].join('&');

const {
  SERVER_HOST,
  WEBPACK_DEV_SERVER_PORT,
  __CLIENT__,
  __SERVER__,
  __DEV__,
  __PROD__,
  __DEBUG__
} = boldrCfg;

const HOT_MW_PATH = `http://${SERVER_HOST}:${WEBPACK_DEV_SERVER_PORT}/__webpack_hmr`;
const HOT_MW = `webpack-hot-middleware/client?path=${HOT_MW_PATH}&reload=true&timeout=20000`;

debug('Create configuration.');
const config = {
  context: paths.ROOT_DIR,
  cache: true,
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [
      HOT_MW,
      'react-hot-loader/patch',
      boldrCfg.BLDR_ENTRY
    ],
    vendor: VENDOR_DEPENDENCIES
  },
  output: {
    path: paths.BUILD_DIR,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: `http://localhost:${WEBPACK_DEV_SERVER_PORT}/build/`
  },
  module: {
    noParse: [],
    loaders: [
      {
        test: /\.js[x]?$/,
        loader: 'babel',
        exclude: [paths.NODE_MODULES_DIR],
        include: [paths.SRC_DIR],
        query: BABEL_LOADER
      },
      {
        happy: { id: 'json' },
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('styles'),
        include: [paths.SRC_DIR],
        loaders: [
          'style',
          cssLoader,
          'postcss',
          'sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file?name=fonts/[name].[ext]'
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url?limit=10000'
      }
    ]
  },
  postcss: wPack => ([
    require('postcss-import')({ addDependencyTo: wPack }),
    require('postcss-url')(),
    require('lost')(),
    require('autoprefixer')({ browsers: ['last 2 versions'] })
  ]),
  sassLoader: {
    includePaths: scssConfigIncludePaths
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new NpmInstallPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'common', filename: 'common.js' }),
    new webpack.optimize.AggressiveMergingPlugin({
      minSizeReduce: 1.5,
      moveToParents: true
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        DEBUG: JSON.stringify(process.env.DEBUG)
      },
      __CLIENT__,
      __SERVER__,
      __DEV__,
      __PROD__,
      __DEBUG__
    }),
    webpackIsomorphicToolsPlugin.development(),
    new webpack.ProvidePlugin({
      Promise: 'exports-loader?global.Promise!es6-promise' // Promise polyfill
    })
  ],
  resolve: {
    alias: {
      react$: require.resolve(path.join(paths.NODE_MODULES_DIR, 'react')),
      state: require.resolve(path.join(paths.APP_DIR, 'state')),
      scenes: require.resolve(path.join(paths.APP_DIR, 'scenes'))
    },
    // root: [paths.SRC_DIR],
    modulesDirectories: ['src', 'node_modules'],
    extensions: ['', '.js', '.jsx', '.scss']
  },
  node: {
    global: 'window',
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false,
    __dirname: true,
    fs: 'empty'
  }
};
const deps = [
  'react-router-redux/dist/ReactRouterRedux.min.js',
  'redux/dist/redux.min.js'
];
// Optimizing rebundling
deps.forEach(dep => {
  const depPath = path.resolve(paths.NODE_MODULES_DIR, dep);

  config.resolve.alias[dep.split(path.sep)[0]] = depPath;
  config.module.noParse.push(depPath);
});

export default config;
