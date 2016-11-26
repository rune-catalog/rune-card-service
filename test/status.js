'use strict';

const api = require('../src/boot'),
  request = require('supertest');

describe('GET /status', () => {
  let agent;

  before(() => api.boot().then(api => agent = request(api)));

  it('should respond with JSON', done => {
    agent
      .get('/status')
      .expect(200, done);
  });
});
