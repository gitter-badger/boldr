require('babel-register')();

var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

var requireHacker = ('require-hacker');
['png',
  'jpg',
  'jpeg',
  'gif',
  'woff',
  'woff2',
  'ttf',
  'eot',
  'css',
  'scss',
  'svg'
].forEach((type) => {
  requireHacker.hook(type, () => 'module.exports = ""');
});

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};
