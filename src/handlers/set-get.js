'use strict';

const connectionFactory = require('connection-factory'),
  restify = require('restify'),
  R = require('ramda');

module.exports = function setGetHandler(req, res, next) {
  let db;
  let code = req.params.code.toUpperCase();

  connectionFactory.create()
    .then(database => {
      db = database;
      db.collection('sets').findOne(
        { code },
        {
          fields: {
            _id: 0,
            name: 1,
            'cards.name': 1,
            'cards.colors': 1
          }
        });
    })
    .then(set => {
      if (!set) throw new restify.NotFoundError();
      else {
        set = {
          name: set.name,
          cards: R.map(card => ({ name: card.name, colors: serializeColors(card.colors) }), set.cards)
        };
        res.json(set);
      }
    })
    .then(() => next())
    .catch(err => next(err))
    .then(() => db.close());
};
