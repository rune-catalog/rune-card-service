'use strict';

const api = require('../src/boot'),
  request = require('supertest'),
  expect  = require('code').expect,
  Set     = require('../src/model/set');

describe('GET /sets', () => {
  let agent;

  before(() => {
    return api.boot()
      .then(api => agent = request(api))
      .then(() => {
        return Set.remove({ });
      })
      .then(() => {
        return Set.create([{
          name: 'Super Set',
          code: 'SUS',
          cards: [{
            name: 'somecard',
            colors: [ 'Black' ]
          }]
        }]);
      });
  });

  it('should return JSON', done => {
    agent
      .get('/sets')
      .expect('Content-Type', 'application/json')
      .expect(200, done);
  });

  it('should include set names', done => {
    agent
      .get('/sets')
      .expect(res => expect(res.body[0].name).to.equal('Super Set'))
      .expect(200, done);
  });

  it('should include set codes', done => {
    agent
      .get('/sets')
      .expect(res => expect(res.body[0].code).to.equal('SUS'))
      .expect(200, done);
  });

  it('should include set cards', done => {
    agent
      .get('/sets')
      .expect(res => expect(res.body[0].cards[0].name).to.equal('somecard'))
      .expect(200, done);
  });

  it('should omit database IDs', done => {
    agent
      .get('/sets')
      .expect(res => expect(res.body[0].id).not.to.exist())
      .expect(res => expect(res.body[0]._id).not.to.exist())
      .expect(200, done);
  });

  it('should omit database versions', done => {
    agent
      .get('/sets')
      .expect(res => expect(res.body[0].__v).not.to.exist())
      .expect(200, done);
  });
});
