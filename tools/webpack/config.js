import webpack from 'webpack';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
const dist = path.join(__dirname, '../..', 'dist');
const ROOT_DIR = path.resolve(__dirname, '..', '..');

const APP_ENTRY = `${ROOT_DIR}/src/client`;
export default {

  entry: [`${ROOT_DIR}/src/client`],

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
