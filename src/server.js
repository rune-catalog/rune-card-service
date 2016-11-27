'use strict';

module.exports.initEvents = function initEvents(server) {
  server.on('after', (req, res, route, err) => {
    err && server.log.error(err);
  });

  return server;
};

module.exports.initHandlers = function initHandlers(server) {
  server.get('/status',     require('./handlers/status'));
  server.get('/cards',      require('./handlers/card-browse'));
  server.get('/card/:name', require('./handlers/card-get'));
  server.get('/sets',       require('./handlers/set-browse'));
  server.get('/set/:code',  require('./handlers/set-get'));

  return server;
};

module.exports.startServer = function startServer(server) {
  server.listen(8080, () => {
    server.log.info(`${server.name} listening at ${server.url}`);
  });

  return server;
};
