const webpack = require('webpack');
const path = require('path');

module.exports = function(config) {
  config.set({
    browsers: ['jsdom'],
    frameworks: ['mocha', 'sinon'],
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },
    singleRun: true,
    browserNoActivityTimeout: 30000,
    webpack: {
      devtool: 'inline-source-map',
      context: path.join(__dirname, 'src', 'app'),
      module: {
        loaders: [
          {
            test: /\.js$|\.jsx$/,
            loader: 'babel',
            query: {
              presets: ['es2015', 'react', 'stage-0'],
              plugins: [
                'transform-decorators-legacy'
              ]
            },
            include: path.join(__dirname, 'src', 'app'),
            exclude: path.join(__dirname, '/node_modules/')
          },
          { test: /\.json$/, loader: 'json-loader' },
          { test: /\.css$/, loader: 'null-loader' },
          { test: /\.scss$/, loader: 'null-loader' }
        ]
      },
      resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.scss'],
        modulesDirectories: [
          'src/app', 'node_modules'
        ]
      },
      node: {
        fs: 'empty'
      },
      watch: true
    },
    webpackMiddleware: {
      noInfo: true
    },
    webpackServer: {
      noInfo: true // Do not spam the console when running in karma
    },
    plugins: [
      'karma-jsdom-launcher',
      'karma-mocha',
      'karma-sinon',
      'karma-mocha-reporter',
      'karma-sourcemap-loader',
      'karma-webpack'
    ],
    reporters: ['mocha'],
    logLevel: config.LOG_INFO
  });
};
