'use strict';

const mongoose = require('mongoose'),
  Piloted = require('piloted');

let connection;

module.exports.create = function dbConnectionFactory() {
  if (connection) {
    return Promise.resolve(connection);
  }

  let uri = buildConnectionUri();
  mongoose.Promise = Promise;
  return connection = mongoose.connect(uri);
};

function buildConnectionUri() {
  let server = Piloted('cards-replicaset');
  return `mongodb://${server.address}:${server.port}/rune`;
}
