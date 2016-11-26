'use strict';

const Wreck = require('wreck'),
  MB_PORT = 2525,
  PORT = 8500;

before(done => {
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

  let opts = { payload: stub };

  Wreck.post(`http://127.0.0.1:${MB_PORT}/imposters`, opts, (err, res) => {
    done(err);
  });
});

after(done => {
  Wreck.delete(`http://127.0.0.1:${MB_PORT}/imposters`, (err, res) => {
    done(err);
  });
});
