'use strict';

const connectionFactory = require('../connection-factory'),
  util = require('../util');

module.exports = function cardBrowseHandler(req, res, next) {
  let db;

  connectionFactory.create()
    .then(database => {
      db = database;
      let collection = db.collection('cards');
      return collection.find({ }, { name: 1, colors: 1, _id: 0 }).toArray();
    })
    .then(docs => {
      let cards = R.map(doc => ({
        name: doc.name,
        colors: util.serializeColors(doc.colors)
      }), docs);
      res.json(cards);
    })
    .catch(err => console.error(err))
    .then(() => {
      db.close();
      next();
    });
};
