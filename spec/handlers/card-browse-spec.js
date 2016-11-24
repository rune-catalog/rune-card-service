'use strict';

const request = require('supertest'),
  api = require('../../src/index'),
  mb = require('../helpers/consul-helper');

describe('GET /cards', () => {
  let agent;

  beforeAll(done => {
    mb.stubConsul()
      .then(() => agent = request(api))
      .then(done)
      .catch(done.fail);
  });

  it('should respond with JSON', done => {
    agent
      .get('/cards')
      .expect('Content-Type', 'application/json')
      .end(failOnErr(done));
  });

  it('should include card names', done => {
    agent
      .get('/cards')
      .expect(res => expect(res.body[0].name).toExist())
      .expect(200)
      .end(failOnErr(done));
  });

  it('should include card colors');

  it('should include all cards from DB');
});

function failOnErr(done) {
  return (err, res) => {
    if (err) {
      console.error(res.body);
      done.fail(err);
    }
    else done();
  }
}
