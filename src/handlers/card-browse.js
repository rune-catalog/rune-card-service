'use strict';

const Card          = require('../model/card'),
  connectionFactory = require('../connection-factory');

module.exports = function cardBrowseHandler(req, res, next) {
  Card.find({ name: 'Naturalize' }, (err, cards) => {
    if (err) return next(err);
    if (cards == null) {
      return [ ];
    }
    res.json(cards);
    next();
  });
};
