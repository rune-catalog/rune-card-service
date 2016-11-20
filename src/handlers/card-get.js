'use strict';

const connectionFactory = require('../connection-factory'),
  util = require('../util');

module.exports = function cardGetHandler(req, res, next) {
  let db;

  connectionFactory.create()
    .then(database => {
      db = database;
      db.collection('cards').findOne(
        { name: req.params.name },
        {
          _id: 0,
          name: 1,
          manaCost: 1,
          colors: 1,
          type: 1,
          text: 1
        }
      );
    })
    .then(card => {
      if (!card) res.send(404);
      else {
        card.colors = util.serializeColors(card.colors);
        res.json(card);
      }
      next();
    })
    .catch(err => next(err))
    .then(() => db.close());
};
