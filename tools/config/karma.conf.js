var webpack = require('webpack');
var path = require('path');
var rootdir = path.resolve(__dirname, '../../');
module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      rootdir + '/test/**/*.spec.js'
    ],
    preprocessors: {
      'src/server/**/*.js': ['webpack']
    },
    reporters: ['mocha', 'coverage'],
    webpack: {
      resolve: {
        modulesDirectories: [
          'test',
          'node_modules'
        ],
        extensions: ['', '.json', '.js']
      },
      module: {
        preLoaders: [
          {
            test: /\.spec\.js$/,
            include: path.join(rootdir, '/test'),
            exclude: /node_modules/,
            loader: 'babel'
          },
          {
            test: /\.js?$/,
            include: path.join(rootdir, '/test'),
            exclude: /(node_modules|\.spec\.js$)/,
            loader: 'babel'
          }
        ],
        loaders: [
          { test: /\.json$/, loaders: ['json'] },
          { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
          { test: /\.css$/, loader: 'css-loader/locals!postcss-loader' }
        ]
      }
    },
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      type: 'lcov',
      dir: rootdir + '/docs',
      subdir: '.'
    }
  });
};
