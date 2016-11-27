'use strict';

const api = require('../src/boot'),
  request = require('supertest'),
  expect  = require('code').expect,
  { describe, it, before } = require('mocha'),
  Card    = require('../src/model/card');

describe('GET /cards', () => {
  let agent;

  before(() => {
    return api.boot()
      .then(api => agent = request(api))
      .then(() => {
        return Card.remove({ });
      })
      .then(() => {
        return Card.create([
          {
            name: 'Green Lotus',
            colors: [ 'Blue', 'Green' ]
          },
          {
            name: 'Purple Lotus',
            colors: [ ]
          }
        ]);
      });
  });

  it('should respond with JSON', done => {
    agent
      .get('/cards')
      .expect('Content-Type', 'application/json')
      .expect(200, done);
  });

  it('should include card names', done => {
    agent
      .get('/cards')
      .expect(res => expect(res.body[0].name).to.exist())
      .expect(200, done);
  });

  it('should include card colors', done => {
    agent
      .get('/cards')
      .expect(res => expect(res.body[0].colors).to.equal('ug'))
      .expect(200, done);
  });

  it('should not expose database IDs', done => {
    agent
      .get('/cards')
      .expect(res => expect(res.body[0]._id).not.to.exist())
      .expect(200, done);
  });

  it('should not expose database versions', done => {
    agent
      .get('/cards')
      .expect(res => expect(res.body[0].__v).not.to.exist())
      .expect(200, done);
  });

  it('should include all cards from DB', done => {
    agent
      .get('/cards')
      .expect(res => expect(res.body.length).to.equal(2))
      .expect(200, done);
  });
});
