import webpack from 'webpack';
import path from 'path';
import _debug from 'debug';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import isomorphicToolsConfig from './isomorphic.tools.config';
import boldrCfg from '../config';
import paths from '../config/paths';
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(isomorphicToolsConfig);
const debug = _debug('app:webpack:config:dev');

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

const babelLoaderConfiguration = {
  cacheDirectory: true,
  plugins: [
    ['transform-runtime', { polyfill: false, regenerator: false }],
    'transform-decorators-legacy',
    ['babel-plugin-module-alias', [
      { src: './tools/config', expose: 'config' },
      { src: './src/app', expose: 'app' },
      { src: './src/app/state', expose: 'state' },
      { src: './src/app/core', expose: 'core' },
      { src: './src/app/scenes', expose: 'scenes' },
      { src: './src/app/components', expose: 'components' },
      { src: './src/server', expose: 'server' }
    ]]
  ],
  presets: ['es2015', 'react', 'stage-0'],
  env: {
    development: {
      presets: ['react-hmre']
    },
    production: {
      presets: ['react-optimize']
    }
  }
};
const {
  SERVER_HOST,
  BLDR_ENTRY,
  VENDOR_DEPENDENCIES,
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
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: ['react-hot-loader/patch', HOT_MW,
      boldrCfg.BLDR_ENTRY
    ],
    vendors: VENDOR_DEPENDENCIES
  },
  output: {
    path: paths.BUILD_DIR,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: `http://localhost:${WEBPACK_DEV_SERVER_PORT}/build/`
  },
  resolve: {
    alias: {},
    root: [paths.SRC_DIR],

    extensions: ['', '.js', '.jsx']
  },
  module: {
    noParse: [],
    loaders: [
      {
        test: /\.js[x]?$/,
        loader: 'babel',
        exclude: [paths.NODE_MODULES_DIR],
        include: [paths.SRC_DIR],
        query: babelLoaderConfiguration
      },
      {
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
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', 2),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __CLIENT__,
      __SERVER__,
      __DEV__,
      __PROD__,
      __DEBUG__
    }),
    webpackIsomorphicToolsPlugin.development()
  ]
};

// Optimizing rebundling
deps.forEach(dep => {
  const depPath = path.resolve(paths.NODE_MODULES_DIR, dep);

  config.resolve.alias[dep.split(path.sep)[0]] = depPath;
  config.module.noParse.push(depPath);
});

export default config;
