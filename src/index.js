'use strict'

const restify = require('restify'),
  Piloted = require('piloted'),
  ContainerPilot = require('/etc/containerpilot.json');

Piloted.config(ContainerPilot, err => console.error(err));

let server = restify.createServer();
server.get('/status',     require('./handlers/status'));
server.get('/cards',      require('./handlers/card-browse');
server.get('/card/:name', require('./handlers/card-get'));
server.get('/sets',       require('./handlers/set-browse'));
server.get('/set/:code',  require('./handlers/set-get'));

server.listen(8080, () => {
  console.log(`${server.name} listening at ${server.url}`);
});
