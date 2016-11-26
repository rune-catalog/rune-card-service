'use strict';

const util = require('../src/util'),
  expect = require('code').expect;

describe('util', () => {
  describe('#serializeColors', () => {
    it('should convert White', () => {
      expect(util.serializeColors([ 'White' ])).to.equal('w');
    });

    it('should convert Blue', () => {
      expect(util.serializeColors([ 'Blue' ])).to.equal('u');
    });

    it('should convert Black', () => {
      expect(util.serializeColors([ 'Black' ])).to.equal('b');
    });

    it('should convert Red', () => {
      expect(util.serializeColors([ 'Red' ])).to.equal('r');
    });

    it('should convert Green', () => {
      expect(util.serializeColors([ 'Green' ])).to.equal('g');
    });

    it('should convert no colors', () => {
      expect(util.serializeColors([ ])).to.equal('');
    });

    it('should convert multiple colors', () => {
      expect(util.serializeColors([ 'Blue', 'Green' ])).to.equal('ug');
    });
  });
});
