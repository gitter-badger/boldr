const path = require('path');
const webpack = require('webpack');

const root = path.resolve(__dirname, '..', '..', '..', '..');

module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? null : 'inline-source-map',

  output: {
    path: path.join(root, 'static/dist/dlls'),
    filename: 'dll__[name].js',
    library: 'DLL_[name]_[hash]'
  },

  entry: {
    vendor: [
      'babel-polyfill',
      /*
        <babel-runtime>
        Generate this list using the following command against the stdout of
        webpack running against the source bundle config (dev/prod.js):
        ./node_modules/.bin/webpack \
          --config ./webpack/dev.config.js \
          --display-modules | egrep -o 'babel-runtime/\S+' | sed 's/\.js$//' | sort | uniq

          If you see babel-runtime/~/core-js/** you will want to remove everything up to the core-js/
          like ive done below.

          IMPORTANT list your vendor files (react deps) after the babel stuff.
       */
      'babel-runtime/core-js/is-iterable',
      'babel-runtime/core-js/object/assign',
      'babel-runtime/core-js/object/create',
      'babel-runtime/core-js/object/define-property',
      'babel-runtime/core-js/object/set-prototype-of',
      'babel-runtime/core-js/symbol',
      'babel-runtime/core-js/symbol/iterator',
      'babel-runtime/helpers/classCallCheck',
      'babel-runtime/helpers/createClass',
      'babel-runtime/helpers/defineProperty',
      'babel-runtime/helpers/extends',
      'babel-runtime/helpers/inherits',
      'babel-runtime/helpers/objectWithoutProperties',
      'babel-runtime/helpers/possibleConstructorReturn',
      'babel-runtime/helpers/slicedToArray',
      'babel-runtime/helpers/typeof',
      'core-js/library/fn/get-iterator',
      'core-js/library/fn/is-iterable',
      'core-js/library/fn/object/assign',
      'core-js/library/fn/object/create',
      'core-js/library/fn/object/define-property',
      'core-js/library/fn/object/set-prototype-of',
      'core-js/library/fn/symbol/index',
      'core-js/library/fn/symbol/iterator',
      'core-js/library/modules/_a-function',
      'core-js/library/modules/_add-to-unscopables',
      'core-js/library/modules/_an-object',
      'core-js/library/modules/_array-includes',
      'core-js/library/modules/_classof',
      'core-js/library/modules/_cof',
      'core-js/library/modules/_core',
      'core-js/library/modules/_ctx',
      'core-js/library/modules/_defined',
      'core-js/library/modules/_descriptors',
      'core-js/library/modules/_dom-create',
      'core-js/library/modules/_enum-bug-keys',
      'core-js/library/modules/_enum-keys',
      'core-js/library/modules/_export',
      'core-js/library/modules/_fails',
      'core-js/library/modules/_global',
      'core-js/library/modules/_has',
      'core-js/library/modules/_hide',
      'core-js/library/modules/_html',
      'core-js/library/modules/_ie8-dom-define',
      'core-js/library/modules/_iobject',
      'core-js/library/modules/_is-array',
      'core-js/library/modules/_is-object',
      'core-js/library/modules/_iter-create',
      'core-js/library/modules/_iter-define',
      'core-js/library/modules/_iter-step',
      'core-js/library/modules/_iterators',
      'core-js/library/modules/_keyof',
      'core-js/library/modules/_library',
      'core-js/library/modules/_meta',
      'core-js/library/modules/_object-assign',
      'core-js/library/modules/_object-create',
      'core-js/library/modules/_object-dp',
      'core-js/library/modules/_object-dps',
      'core-js/library/modules/_object-gopd',
      'core-js/library/modules/_object-gopn',
      'core-js/library/modules/_object-gopn-ext',
      'core-js/library/modules/_object-gops',
      'core-js/library/modules/_object-gpo',
      'core-js/library/modules/_object-keys',
      'core-js/library/modules/_object-keys-internal',
      'core-js/library/modules/_object-pie',
      'core-js/library/modules/_property-desc',
      'core-js/library/modules/_redefine',
      'core-js/library/modules/_set-proto',
      'core-js/library/modules/_set-to-string-tag',
      'core-js/library/modules/_shared',
      'core-js/library/modules/_shared-key',
      'core-js/library/modules/_string-at',
      'core-js/library/modules/_to-index',
      'core-js/library/modules/_to-integer',
      'core-js/library/modules/_to-iobject',
      'core-js/library/modules/_to-length',
      'core-js/library/modules/_to-object',
      'core-js/library/modules/_to-primitive',
      'core-js/library/modules/_uid',
      'core-js/library/modules/_wks',
      'core-js/library/modules/_wks-define',
      'core-js/library/modules/_wks-ext',
      'core-js/library/modules/core.get-iterator',
      'core-js/library/modules/core.get-iterator-method',
      'core-js/library/modules/core.is-iterable',
      'core-js/library/modules/es6.array.iterator',
      'core-js/library/modules/es6.object.assign',
      'core-js/library/modules/es6.object.create',
      'core-js/library/modules/es6.object.define-property',
      'core-js/library/modules/es6.object.set-prototype-of',
      'core-js/library/modules/es6.object.to-string',
      'core-js/library/modules/es6.string.iterator',
      'core-js/library/modules/es6.symbol',
      'core-js/library/modules/es7.symbol.async-iterator',
      'core-js/library/modules/es7.symbol.observable',
      'core-js/library/modules/web.dom.iterable',
      // </babel-runtime>

      'invariant',
      'react',
      'react-dom',
      'redux',
      'react-router',
      'react-router-redux',
      'react-redux',
      'axios',
      'superagent',
      'redux-thunk',
      'redux-form',
      'material-ui',
      'react-tap-event-plugin',
      'redial',
      'react-router-scroll',
      'webfontloader'
    ]
  },

  resolve: {
    root: path.resolve(root, 'node_modules'),
    extensions: ['', '.js'],
    postfixes: []
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),

    new webpack.DllPlugin({
      path: path.join(root, 'tools/webpack/dlls/manifests/[name].json'),
      name: 'DLL_[name]_[hash]'
    })
  ]
};
