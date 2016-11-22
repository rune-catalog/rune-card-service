'use strict'

const restify    = require('restify'),
  connectionFactory = require('./connection-factory'),
  Piloted        = require('piloted'),
  ContainerPilot = require('../containerpilot.json');

let server = restify.createServer();

Piloted.config(ContainerPilot, err => server.log.error(err));

connectionFactory.create()
  .then(() => server.log.info('connected to DB successfully'))
  .catch(err => server.log.error(err));

server.get('/status',     require('./handlers/status'));
server.get('/cards',      require('./handlers/card-browse'));
server.get('/card/:name', require('./handlers/card-get'));
server.get('/sets',       require('./handlers/set-browse'));
server.get('/set/:code',  require('./handlers/set-get'));

server.on('after', (req, res, route, err) => {
  err && server.log.error(err);
});

server.listen(8080, () => {
  server.log.info(`${server.name} listening at ${server.url}`);
});

module.exports = server;
