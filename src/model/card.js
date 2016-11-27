'use strict';

const mongoose = require('mongoose'),
  util = require('../util');

const schema = new mongoose.Schema({
  name: String,
  colors: {
    type: [ String ],
    get: util.serializeColors
  }
}, {
  id: false,
  toJSON: { getters: true, transform: transformCardDoc }
});

function transformCardDoc(doc, ret) {
  delete ret._id;
  delete ret.__v;
  return ret;
}

module.exports = mongoose.model('Card', schema);
