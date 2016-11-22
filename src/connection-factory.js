'use strict';

const mongoose = require('mongoose'),
  Piloted = require('piloted');

module.exports.create = function dbConnectionFactory() {
  let uri = buildConnectionUri();
  mongoose.Promise = Promise;
  return mongoose.connect(uri);
};

function buildConnectionUri() {
  let server = Piloted('cards-replicaset');
  return `mongodb://${server.address}:${server.port}/rune`;
}
