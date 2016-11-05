'use strict';

const MongoClient = require('mongodb').MongoClient;

module.exports = function setBrowseHandler(req, res, next) {
  let db;

  MongoClient.connect('mongodb://card-db/rune')
    .then(database => {
      db = database;
      let collection = db.collection('sets');
      return collection.find(
        { },
        {
          name: 1,
          code: 1,
          _id: 0
        }).toArray();
    })
    .then(docs => {
      res.json(docs);
      next();
    })
    .catch(err => next(err))
    .then(() => db.close());
};
