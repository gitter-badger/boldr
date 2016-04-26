import webpack from 'webpack';
import path from 'path';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';

import webpackConfig from './config';

const ROOT_DIR = path.resolve(__dirname, '..', '..');
const src = `${ROOT_DIR}/src`;

export default {
  ...webpackConfig,

  devtool: 'eval',
  name: 'browser',
  entry: [
    ...webpackConfig.entry,
    'webpack-hot-middleware/client'
  ],

  module: {
    loaders: [...webpackConfig.loaders, {
      test: /\.(js|jsx)$/,
      loader: 'babel',
      include: src,
      query: { presets: ['react-hmre'] }
    },
    { test: /\.scss$/, loaders: ['style', 'css', 'postcss'], include: src },
    { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
    { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
    { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
    { test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=10240' }
    ]
  },

  postcss: wp => [postcssImport({ addDependencyTo: wp }), precss, autoprefixer],

  plugins: [
    ...webpackConfig.plugins,
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
