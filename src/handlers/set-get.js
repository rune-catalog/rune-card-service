'use strict';

const restify = require('restify'),
  Set = require('../model/set');

module.exports = function setGetHandler(req, res, next) {
  Set.findOne({ code: req.params.code }, (err, doc) => {
    if (err) return next(err);
    if (!doc) return next(new restify.NotFoundError());
    res.json(doc);
    next();
  });
};
