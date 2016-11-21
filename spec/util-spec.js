'use strict';

const util = require('../src/util');

describe('util', () => {

  describe('#serializeColors', () => {

    it('should convert White', () => {
      expect(util.serializeColors([ 'White' ])).toEqual('w');
    });

    it('should convert Blue', () => {
      expect(util.serializeColors([ 'Blue' ])).toEqual('u');
    });

    it('should convert Black', () => {
      expect(util.serializeColors([ 'Black' ])).toEqual('b');
    });

    it('should convert Red', () => {
      expect(util.serializeColors([ 'Red' ])).toEqual('r');
    });

    it('should convert Green', () => {
      expect(util.serializeColors([ 'Green' ])).toEqual('g');
    });

    it('should convert no colors', () => {
      expect(util.serializeColors([ ])).toEqual('');
    });

    it('should convert multiple colors', () => {
      expect(util.serializeColors([ 'Blue', 'Green' ])).toEqual('ug');
    });

  });

});
