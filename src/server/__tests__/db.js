/* eslint-disable */
var environment = process.env.NODE_ENV || 'test';
var config = require('../../../knexfile.js')['test'];

module.exports = require('knex')(config);
