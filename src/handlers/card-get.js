'use strict';

const Card = require('../model/card'),
  restify  = require('restify');

module.exports = function cardGetHandler(req, res, next) {
  Card.findOne({ name: req.params.name }, (err, card) => {
    if (err) return next(err);
    if (!card) return next(new restify.NotFoundError());
    res.json(card);
    next();
  });
};
