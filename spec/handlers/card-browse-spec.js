'use strict';

const request = require('supertest'),
  api = require('../../src/index');

describe('GET /cards', () => {
  let agent = request(api);

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
