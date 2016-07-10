/* eslint-disable no-console */

const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ROOT_DIR = path.join(__dirname, '..', '..');
const dotenv = require('dotenv');
dotenv.config({ silent: true });

// :: [Any] -> [Any]
function removeEmpty(x) {
  return x.filter(y => !!y);
}

// :: bool -> (Any, Any) -> Any
function ifElse(condition) {
  return (then, or) => (condition ? then : or);
}

// :: ...Object -> Object
function merge() {
  const funcArgs = Array.prototype.slice.call(arguments); // eslint-disable-line prefer-rest-params

  return Object.assign.apply(
    null,
    removeEmpty([{}].concat(funcArgs))
  );
}

const cssChunkNaming = '[name]__[local]___[hash:base64:5]';

const cssLoader = [
  'css?modules',
  'sourceMap',
  'importLoaders=2',
  `localIdentName=${cssChunkNaming}`
].join('&');

function webpackConfigFactory({ target, mode }) {
  if (!target || !~['client', 'server'].findIndex(valid => target === valid)) {
    throw new Error(
      'You must provide a "target" (client|server) to the webpackConfigFactory.'
    );
  }

  if (!mode || !~['development', 'production'].findIndex(valid => mode === valid)) {
    throw new Error(
      'You must provide a "mode" (development|production) to the webpackConfigFactory.'
    );
  }

  console.log(`==> ℹ️  Creating webpack "${target}" config in "${mode}" mode`);

  const isDev = mode === 'development';
  const isProd = mode === 'production';
  const isClient = target === 'client';
  const isServer = target === 'server';

  const ifDev = ifElse(isDev);
  const ifProd = ifElse(isProd);
  const ifClient = ifElse(isClient);
  const ifServer = ifElse(isServer);
  const ifDevClient = ifElse(isDev && isClient);
  const ifDevServer = ifElse(isDev && isServer);
  const ifProdClient = ifElse(isProd && isClient);

  return {
  // @wp1
    target: ifServer('node', 'web'),
  // @wp2
    node: {
      __dirname: true,
      __filename: true,
      module: false,
      clearImmediate: false,
      setImmediate: false,
      fs: 'empty'
    },
    // cache: !(isDev && isServer),
  // @wp3
    externals: removeEmpty([
  // @wp3.1
      ifServer(nodeExternals({
  // @wp3.2
        binaryDirs: ['normalize.css']
      }))
    ]),
    context: path.join(__dirname, '..', '..'),
    devtool: ifElse(isServer || isDev)(
  // @wp4
      'source-map',
  // @wp4.1
      'hidden-source-map'
    ),
  // @wp5
    entry: merge(
      {
        main: removeEmpty([
          ifDevClient('react-hot-loader/patch'),
          ifDevClient(`webpack-hot-middleware/client?reload=true&path=http://localhost:${process.env.WP_DS_PORT}/__webpack_hmr`), // eslint-disable-line
          path.resolve(ROOT_DIR, `./src/${target}/index.js`)
        ])
      },
      ifClient({
        // @wp5.1
        vendor: removeEmpty([
          'react',
          'react-dom',
          'redux',
          'react-router',
          'react-router-redux',
          'react-redux',
          'axios',
          'redux-thunk',
          'socket.io-client',
          'material-ui',
          'react-tap-event-plugin'
        ])
      })
    ),
    output: {
  // @wp6.1
      path: path.resolve(ROOT_DIR, `./build/${target}`),
      filename: ifProdClient(
  // @wp6.2
        '[name]-[hash].js',
  // @wp6.3
        '[name].js'
      ),
      chunkFilename: '[name]-[chunkhash].js',
  // @wp6.4
      publicPath: ifDev(
  // @wp6.5
        `http://localhost:${process.env.WP_DS_PORT}/assets/`,
        '/assets/'
      ),
  // @wp6.6
      libraryTarget: ifServer('commonjs2', 'var')
    },
    resolve: {
      root: [path.resolve(ROOT_DIR)],
      extensions: ['', '.js', '.jsx', '.scss', '.css', '.json'],
      fallback: path.join(ROOT_DIR, 'node_modules'),
      alias: {
        shared: path.resolve(ROOT_DIR, 'src/shared'),
        components: path.resolve(ROOT_DIR, 'src/shared/components'),
        state: path.resolve(ROOT_DIR, 'src/shared/state'),
        scenes: path.resolve(ROOT_DIR, 'src/shared/scenes'),
        server: path.resolve(ROOT_DIR, 'src/server')
      }
    },
    resolveLoader: { fallback: path.join(ROOT_DIR, 'node_modules') },
    plugins: removeEmpty([
  // @wp7
      new webpack.DefinePlugin({
        'process.env': {
  // @wp7.1
          NODE_ENV: JSON.stringify(mode),
          SERVER_PORT: JSON.stringify(process.env.SERVER_PORT),
          WP_DS_PORT: JSON.stringify(process.env.WP_DS_PORT),
          DISABLE_SSR: process.env.DISABLE_SSR,
          WEBSITE_TITLE: JSON.stringify(process.env.WEBSITE_TITLE),
          WEBSITE_DESC: JSON.stringify(process.env.WEBSITE_DESC)
        }
      }),

  // @wp8
      new AssetsPlugin({
        filename: 'assets.json',
        path: path.resolve(ROOT_DIR, `./build/${target}`)
      }),

  // @wp9
      ifClient(
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          minChunks: Infinity
        })
      ),

  // @wp 10
      ifDev(new webpack.NoErrorsPlugin()),

      // We need this plugin to enable hot module reloading for our dev server.
      ifDevClient(new webpack.HotModuleReplacementPlugin()),

      // Ensure only 1 file is output for the server bundles.  This makes it
      // much easer for us to clear the module cache when reloading the server.
      ifDevServer(new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })),

      // Adds options to all of our loaders.
      ifProdClient(
        new webpack.LoaderOptionsPlugin({
          // Indicates to our loaders that they should minify their output
          // if they have the capability to do so.
          minimize: true,
          // Indicates to our loaders that they should enter into debug mode
          // should they support it.
          debug: false
        })
      ),

      ifProdClient(
        // JS Minification.
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            screw_ie8: true,
            warnings: false
          }
        })
      ),
      ifClient(
        new webpack.ProvidePlugin({
          React: 'react'
        })
      ),
      ifProd(
        // This is actually only useful when our deps are installed via npm2.
        // In npm2 its possible to get duplicates of dependencies bundled
        // given the nested module structure. npm3 is flat, so this doesn't
        // occur.
        new webpack.optimize.DedupePlugin()
      ),

      ifProdClient(
        // This is a production client so we will extract our CSS into
        // CSS files.
        new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true })
      )
    ]),
    module: {
      loaders: [
        // Javascript
        {
          test: /\.js$|\.jsx$/,
          loader: 'babel-loader',
          exclude: [/node_modules/, path.resolve(ROOT_DIR, './build')],
          query: merge(
            {
              plugins: [['transform-runtime', { polyfill: false }]],
              env: {
                development: {
                  plugins: ['react-hot-loader/babel', 'transform-decorators-legacy']
                }
              }
            },
            ifServer({
              presets: ['react', 'stage-0']
            }),
            ifClient({
              presets: ['react', 'es2015-webpack', 'stage-0']
            }),
            ifProdClient({
              presets: ['react', 'es2015-webpack', 'stage-0', 'react-optimize']
            })
          )
        },
        { test: /\.json$/, loader: 'json-loader' },
        {
          test: /\.(jpg|jpeg|png|gif|svg)$/,
          loaders: ['url?limit=25000', 'img']
        },
        {
          test: /\.(eot|woff|woff2|ttf|svg)$/,
          loader: 'url?limit=20000'
        },
        // CSS
        merge(
          { test: /\.scss$/ },
          // When targetting the server we fake out the style loader as the
          // server can't handle the styles and doesn't care about them either..
          ifServer({
            loaders: [
              'fake-style-loader',
              'css-loader'
            ]
          }),
          // For a production client build we use the ExtractTextPlugin which
          // will extract our SCSS into CSS files.  The plugin needs to be
          // registered within the plugins section too.
          ifProdClient({
            loader: ExtractTextPlugin.extract('style-loader', cssLoader, 'postcss', 'sass')
          }),
          // For a development client we will use a straight style & css loader
          // along with source maps.  This combo gives us a better development
          // experience.
          ifDevClient({
            loaders: [
              'style',
              cssLoader,
              'postcss',
              'resolve-url-loader',
              'sass?sourceMap']
          })
        ),
        merge(
          { test: /\.css$/ },
          // When targetting the server we fake out the style loader as the
          // server can't handle the styles and doesn't care about them either..
          ifServer({
            loaders: [
              'fake-style-loader',
              'css-loader'
            ]
          }),
          // For a production client build we use the ExtractTextPlugin which
          // will extract our CSS into CSS files.  The plugin needs to be
          // registered within the plugins section too.
          ifProdClient({
            loader: ExtractTextPlugin.extract('style-loader', cssLoader, 'postcss')
          }),
          // For a development client we will use a straight style & css loader
          // along with source maps.  This combo gives us a better development
          // experience.
          ifDevClient({
            loaders: [
              'style',
              cssLoader,
              'resolve-url-loader',
              'postcss']
          })
        )
      ]
    },
    sassLoader: {
      includePaths: [
        path.resolve(ROOT_DIR, 'node_modules'),
        path.resolve(ROOT_DIR, 'src/shared')
      ]
    },
    postcss: [
      autoprefixer({
        browsers: ['last 2 versions']
      })
    ]
  };
}

module.exports = webpackConfigFactory;
