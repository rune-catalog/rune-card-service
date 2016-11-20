'use strict';

const connectionFactory = require('../connection-factory'),
  restify = require('restify');

module.exports = function setBrowseHandler(req, res, next) {
  let db;

  connectionFactory.create()
    .then(database => {
      db = database;
      db.collection('sets').find(
        { },
        {
          name: 1,
          code: 1,
          _id: 0
        }).toArray();
    })
    .then(docs => {
      if (!docs) {
        throw new resitfy.NotFoundError();
      }
      res.json(docs);
      next();
    })
    .catch(err => next(err))
    .then(() => db.close());
};
