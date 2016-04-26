import webpack from 'webpack';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
const dist = path.resolve(__dirname, '../dist');

export default {

  entry: ['./src/client'],

  resolve: {
    modules: ['src', 'node_modules'],
    unsafeCache: true
  },

  loaders: [],

  output: {
    path: dist,
    filename: 'bundle.js',
    publicPath: '/dist/'
  },

  plugins: [

    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
        BROWSER: JSON.stringify(true)
      }
    })

  ]
};
