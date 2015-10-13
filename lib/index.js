'use strict';

let buildConfig = require('./config_builder');
let fs = require('fs');
let _ = require('lodash');
let helpers = require('./helpers');

let toss = helpers.toss;

// Load clients
let clients = {};
let clientDir = fs.readdirSync(__dirname + '/clients');
_.each(clientDir, function (fileName) {
  if (/\.js$/.test(fileName) && fileName !== 'index.js') {
    clients[fileName.replace(/\.js$/, '')] = require('./clients/' + fileName);
  }
});

// Return client builder
module.exports = function (config) {
  config = buildConfig(config);
  let client = {};
  _.each(config.resources, function (settings, name) {
    settings.method = settings.method || 'http';
    if (!_.isFunction(clients[settings.method])) toss('Attempted to use unsupported method [' + settings.method + ']');
    settings.timeout = settings.timeout || config.timeout;
    client[name] = clients[settings.method](settings);
  });

  return client;
};