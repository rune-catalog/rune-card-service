'use strict';

const restify       = require('restify'),
  appServer         = require('./server'),
  connectionFactory = require('./connection-factory'),
  autopilot         = require('./autopilot').autopilot,
  ContainerPilot    = require('../containerpilot.json');

module.exports.boot = function boot() {
  const server = restify.createServer();

  return autopilot(ContainerPilot)
    .then(connectionFactory.create)
    .then(() => server)
    .then(appServer.initHandlers)
    .then(appServer.initEvents)
    .catch(err => server.log.error(err));
};
