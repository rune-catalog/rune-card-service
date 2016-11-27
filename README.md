[![Build Status](https://travis-ci.org/rune-catalog/rune-card-service.svg?branch=master)](https://travis-ci.org/rune-catalog/rune-card-service)

# rune-cards-service

A NodeJS providing an HTTP API for Magic cards.

## Running

In production, this service is run in a docker container which is networked to
some other microservices. To run it locally, check out rune-catalog/rune-development.

## Testing

Make sure that you have:

- An environment variable `CONSUL=localhost`
- mongodb running on `localhost:27017`

Then run `npm test`.
