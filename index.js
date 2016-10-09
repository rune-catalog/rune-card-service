'use strict'

const restify = require('restify'),
  MongoClient = require('mongodb').MongoClient;

let server = restify.createServer()

server.get('/', (req, res, next) => {
  res.send('Hello world')
  next()
})

server.get('/cards', (req, res, next) => {
  let db

  MongoClient.connect('mongodb://localhost:27017/rune')
    .then(database => {
      db = database
      let collection = db.collection('cards')
      return collection.find({ }, { name: true, colors: true, _id: false}).toArray()
    })
    .then(docs => {
      res.json(docs)
    })
    .catch(err => console.error(err))
    .then(() => {
      db.close()
      next()
    })
})

server.get('/set/:code', (req, res, next) => {
  let db

  MongoClient.connect('mongodb://localhost:27017/rune')
    .then(database => {
      db = database
      let collection = db.collection('sets')
      let code = req.params.code.toUpperCase()
      return collection.findOne(
        { code },
        {
          fields: {
            _id: 0,
            name: 1,
            'cards.name': 1,
            'cards.colors': 1
          }
        })
    })
    .then(set => {
      if (!set) res.send(404)
      else res.json(set)
    })
    .catch(err => next(err))
    .then(() => {
      db.close()
      next()
    })
})

server.listen(8080, () => {
  console.log(`${server.name} listening at ${server.url}`)
})
