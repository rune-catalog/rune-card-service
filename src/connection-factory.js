'use strict';

const MongoClient = require('mongodb').MongoClient,
  Piloted = require('piloted');

module.exports.create = function dbConnectionFactory() {
  let server = Piloted('cards-replicaset');
  let uri = `mongodb://${server.address}:${server.port}/rune`;
  return MongoClient.create(uri);
};
