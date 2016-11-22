'use strict';

const mongoose = require('mongoose');

let schema = new mongoose.Schema({
  name: String,
  colors: [ String ]
}, {
  bufferCommands: false,
  id: false
});

module.exports = mongoose.model('Card', schema);
