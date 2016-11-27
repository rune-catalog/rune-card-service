'use strict';

const api = require('../src/boot'),
  request = require('supertest'),
  Set = require('../src/model/set');

describe('GET /set/:code', () => {
  let agent;

  before(() => {
    return api.boot()
    .then(api => {
      // silence expected errors during test
      api.log.level('FATAL');
      agent = request(api);
    })
      .then(() => Set.remove({ }))
      .then(() => {
        Set.create([
          {
            name: '52 Card Pickup',
            code: '52C',
            cards: [
              {
                name: 'somecard',
                colors: [ 'Red' ]
              }
            ]
          }
        ])
      });
  });

  it('should return JSON', done => {
    agent.get('/set/52C')
      .expect('Content-Type', 'application/json')
      .expect(200, done);
  });

  it('should 404 when set cannot be found', done => {
    agent.get('/set/fail')
      .expect(404, done);
  });

  it('should include set data', done => {
    agent.get('/set/52C')
    .expect({
      name: '52 Card Pickup',
      code: '52C',
      cards: [
        {
          name: 'somecard',
          colors: 'r'
        }
      ]
    }, done);
  });
});
