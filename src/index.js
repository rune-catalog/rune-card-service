'use strict'

const restify       = require('restify'),
  appServer         = require('./server'),
  connectionFactory = require('./connection-factory'),
  autopilot         = require('./autopilot').autopilot,
  ContainerPilot    = require('../containerpilot.json'),
  server            = restify.createServer();

autopilot(ContainerPilot)
  .then(() => server)
  .then(connectionFactory.create)
  .then(appServer.initHandlers)
  .then(appServer.initEvents)
  .then(appServer.startServer)
  .catch(server.log.eror);

module.exports = server;
