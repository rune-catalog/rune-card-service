'use strict';

const util          = require('../util'),
  connectionFactory = require('../connection-factory'),
  restify           = require('restify'),
  Card              = require('../model/card');

module.exports = function cardGetHandler(req, res, next) {
  Card.findOne({ name: req.params.name }, (err, card) => {
    if (err) return next(err);
    if (!card) return next(new restify.NotFoundError());
    res.json(card);
    next();
  });
};
