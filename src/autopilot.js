'use strict';

const Piloted = require('piloted');

module.exports.autopilot = function autopilot(config) {
  return new Promise((resolve, reject) => {
    Piloted.config(config, err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};
