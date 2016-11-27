'use strict';

const Card = require('../model/card');

module.exports = function cardBrowseHandler(req, res, next) {
  Card.find({ }, (err, cards) => {
    if (err) return next(err);
    res.json(cards);
    next();
  });
};
