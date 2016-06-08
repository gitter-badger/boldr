var context = require.context('./src/app', true, /-test\.js$/);
context.keys().forEach(context);
module.exports = context;
