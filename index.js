'use strict'

const restify = require('restify'),
  MongoClient = require('mongodb').MongoClient,
  R = require('ramda')

let server = restify.createServer()
server.use(restify.CORS())

server.get('/cards', (req, res, next) => {
  let db

  MongoClient.connect('mongodb://card-db/rune')
    .then(database => {
      db = database
      let collection = db.collection('cards')
      return collection.find({ }, { name: 1, colors: 1, _id: 0 }).toArray()
    })
    .then(docs => {
      let cards = R.map(doc => ({
        name: doc.name,
        colors: serializeColors(doc.colors)
      }), docs)
      res.json(cards)
    })
    .catch(err => console.error(err))
    .then(() => {
      db.close()
      next()
    })
})

server.get('/set/:code', (req, res, next) => {
  let db

  MongoClient.connect('mongodb://card-db/rune')
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
      else {
        set = {
          name: set.name,
          cards: R.map(card => ({ name: card.name, colors: serializeColors(card.colors) }), set.cards)
        }
        res.json(set)
      }
    })
    .catch(err => next(err))
    .then(() => {
      db.close()
      next()
    })
})

function serializeColors(colors) {
  if (!colors) {
    return '';
  }
  return R.map(c => {
    switch (c) {
      case 'White':
        return 'w'
      case 'Blue':
        return 'u'
      case 'Black':
        return 'b'
      case 'Red':
        return 'r'
      case 'Green':
        return 'g'
    }
  }, colors).join('')
}

server.listen(8080, () => {
  console.log(`${server.name} listening at ${server.url}`)
})
