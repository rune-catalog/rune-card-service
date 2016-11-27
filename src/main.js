'use strict';

const app = require('./index.js');

app().then(server => server.listen(8080, () => {
  server.log.info(`${server.name} listening on ${server.url}`);
}));
