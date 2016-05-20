import webpack from 'webpack';
import path from 'path';
import _debug from 'debug';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import NpmInstallPlugin from 'npm-install-webpack-plugin';

import isomorphicToolsConfig from './isomorphic.tools.config';
import boldrCfg, { paths } from '../config';

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(isomorphicToolsConfig);
const debug = _debug('app:webpack:config:dev');
const SRC_DIR = paths('src');
const NODE_MODULES_DIR = paths('nodeModules');

const deps = [
  'react-router-redux/dist/ReactRouterRedux.min.js',
  'redux/dist/redux.min.js'
];

const cssLoader = [
  'css?modules',
  'sourceMap',
  'importLoaders=2',
  'localIdentName=[name]__[local]___[hash:base64:5]'
].join('&');

const {
  SERVER_HOST,
  VENDOR_DEPENDENCIES,
  WEBPACK_DEV_SERVER_PORT,
  __CLIENT__,
  __SERVER__,
  __DEV__,
  __PROD__,
  __DEBUG__
} = boldrCfg;

debug('Create configuration.');
const config = {
  context: paths('base'),
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [
      `webpack-hot-middleware/client?reload=true&path=http://${SERVER_HOST}:${WEBPACK_DEV_SERVER_PORT}/__webpack_hmr`,
      paths('entryApp')
    ],
    vendors: VENDOR_DEPENDENCIES
  },
  output: {
    path: paths('build'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: `http://localhost:${WEBPACK_DEV_SERVER_PORT}/build/`
  },
  resolve: {
    alias: {},
    root: [SRC_DIR],

    extensions: ['', '.js', '.jsx']
  },
  module: {
    noParse: [],
    loaders: [
      {
        test: /\.js[x]?$/,
        loader: 'babel',
        exclude: [NODE_MODULES_DIR],
        include: [SRC_DIR],
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('styles'),
        include: [SRC_DIR],
        loaders: [
          'style',
          cssLoader,
          'postcss',
          'sass?sourceMap'
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
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendors', '[name].[hash].js'),
    // new NpmInstallPlugin({ save: true }),
    new webpack.DefinePlugin({
      __CLIENT__,
      __SERVER__,
      __DEV__,
      __PROD__,
      __DEBUG__
    }),
    new webpack.optimize.DedupePlugin(),
    webpackIsomorphicToolsPlugin.development()
  ]
};

// Optimizing rebundling
deps.forEach(dep => {
  const depPath = path.resolve(NODE_MODULES_DIR, dep);

  config.resolve.alias[dep.split(path.sep)[0]] = depPath;
  config.module.noParse.push(depPath);
});

export default config;
