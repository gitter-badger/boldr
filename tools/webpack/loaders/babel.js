const BABEL_LOADER = {
  cacheDirectory: true,
  plugins: [
    ['transform-runtime', { polyfill: false, regenerator: false }],
    'transform-decorators-legacy',
    ['babel-plugin-module-alias', [
      { src: './src/config', expose: 'config' },
      { src: './src/app', expose: 'app' },
      { src: './src/app/shared', expose: 'shared' },
      { src: './src/app/state', expose: 'state' },
      { src: './src/app/scenes', expose: 'scenes' },
      { src: './src/app/components', expose: 'components' },
      { src: './src/server', expose: 'server' }
    ]],
    ['react-transform', {
      transforms: [{
        transform: 'react-transform-hmr',
        imports: ['react'],
        locals: ['module']
      }, {
        transform: 'react-transform-catch-errors',
        imports: ['react', 'redbox-react']
      }]
    }]
  ],
  presets: ['es2015', 'react', 'stage-0'],
  env: {
    development: {
      presets: ['react-hmre'],
      plugins: ['react-hot-loader/babel']
    },
    production: {
      presets: ['react-optimize']
    }
  }
};

export default BABEL_LOADER;
