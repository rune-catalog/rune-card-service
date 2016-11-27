'use strict';

const mongoose = require('mongoose'),
  util = require('../util');

let schema = new mongoose.Schema({
  name: String,
  code: String,
  cards: [ ]
}, {
  id: false,
  toJSON: { getters: true, transform: transformCardDoc }
});

function transformCardDoc(doc, ret, opts) {
  ret.cards = ret.cards.map(card => ({
    name: card.name,
    colors: util.serializeColors(card.colors)
  }));

  delete ret._id;
  delete ret.__v;
  return ret;
}

module.exports = mongoose.model('Set', schema);
