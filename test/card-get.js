'use strict';

const api = require('../src/boot'),
  request = require('supertest'),
  Card    = require('../src/model/card');

describe('GET /card/:name', () => {
  let agent;

  before(() => {
    return api.boot()
    .then(api => {
      // Silence expected testing errors
      api.log.level('FATAL');
      agent = request(api);
    })
      .then(() => Card.remove({ }))
      .then(() => Card.create([
          {
            name: 'dude',
            colors: [ 'Blue' ]
          }
      ]));
  });

  it('should return JSON', done => {
    agent
      .get('/card/dude')
      .expect('Content-Type', 'application/json')
      .expect(200, done);
  });

  it('should return 404 when card does not exist', done => {
    agent
      .get('/card/notactuallyacard')
      .expect(404, done);
  });

  it('should include card name', done => {
    agent
      .get('/card/dude')
      .expect({
        name: 'dude',
        colors: 'u'
      }, done);
  });
});
