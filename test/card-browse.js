'use strict';

const api = require('../src/boot'),
  request = require('supertest'),
  expect  = require('code').expect,
  Card    = require('../src/model/card');

describe('GET /cards', () => {
  let agent;

  before(() => {
    return api.boot()
      .then(api => agent = request(api))
      .then(() => {
        // Card.create([
        //   {
        //     name: 'Green Lotus'
        //   },
        //   {
        //     name: 'Purple Lotus'
        //   }
        // ]);
      });
  });

  it('should respond with JSON', done => {
    agent
      .get('/cards')
      .expect('Content-Type', 'application/json', done);
  });

  it('should include card names', done => {
    agent
      .get('/cards')
      .expect(res => expect(res.body[0].name).toExist())
      .expect(200, done);
  });

  it('should include card colors');

  it('should include all cards from DB');
});
