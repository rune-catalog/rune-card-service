'use strict';

const Wreck = require('wreck'),
  mb = require('mb-promise'),
  { before, after } = require('mocha'),
  MB_PORT = 2525,
  PORT = 8500;

let stub = {
  port: PORT,
  protocol: 'http',
  stubs: [
    {
      responses: [
        {
          is: {
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json'
            },
            body: [
              {
                Service: {
                  Address: '127.0.0.1',
                  Port: 27017
                }
              }
            ]
          }
        }
      ]
    }
  ]
};

before(done => {
  mb.start({ loglevel: 'warn' }).then(() => {
    let opts = { payload: stub };
    Wreck.post(`http://127.0.0.1:${MB_PORT}/imposters`, opts, err => {
      done(err);
    });
  });
});

after(() => mb.stop());
