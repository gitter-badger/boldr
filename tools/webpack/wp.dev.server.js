import path from 'path';
import webpack from 'webpack';
import boldrCfg from 'config';
import paths from 'config/paths';

const commonLoaders = [
  {
    /*
     * TC39 categorises proposals for babel in 4 stages
     * Read more http://babeljs.io/docs/usage/experimental/
     */
    test: /\.js$|\.jsx$/,
    loader: 'babel-loader',
    // Reason why we put this here instead of babelrc
    // https://github.com/gaearon/react-transform-hmr/issues/5#issuecomment-142313637
    query: {
      presets: ['es2015', 'react', 'stage-0'],
      plugins: ['transform-decorators-legacy', 'transform-object-assign']
    },
    include: paths.SRC_DIR,
    exclude: paths.NODE_MODULES_DIR
  },
  { test: /\.json$/, loader: 'json-loader' },
  {
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
    loader: 'url',
    query: {
      name: '[hash].[ext]',
      limit: 10000
    }
  }
];

export default {
    // The configuration for the server-side rendering
  name: 'server-side rendering',
  context: paths.API_DIR,
  entry: {
    server: './index.js'
  },
  target: 'node',
  output: {
    // The output directory as absolute path
    path: paths.BUILD_DIR,
    // The filename of the entry chunk as relative path inside the output.path directory
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: commonLoaders.concat([
      {
        test: /\.css$/,
        loader: 'css/locals?module&localIdentName=[name]__[local]___[hash:base64:5]'
      }
    ])
  },
  resolve: {
    root: [paths.SRC_DIR],
    extensions: ['', '.js', '.jsx', '.css']
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEVCLIENT__: false,
      __DEVSERVER__: true
    })
  ]
};
