'use strict';

const mockery = require('mockery');
const co = require('co');
const _ = require('lodash');

describe('helper test', function () {
  beforeEach( function () {
    this.module = require(`../lib/helpers.js`);

    mockery.enable({
      useCleanCache: true,
      warnOnReplace: false,
      warnOnUnregistered: false
    });
  });

  afterEach(function () {
    mockery.disable();
  });

  it('should export an object functions', function () {
    expect(this.module).toEqual(jasmine.objectContaining({
      checkpoint         : jasmine.any(Function),
      standardizeReqOpts : jasmine.any(Function),
      toss               : jasmine.any(Function),
      PromiseManager     : jasmine.any(Function)
    }));
  });

  describe('checkpoint', function () {
    it ('response', function (done) {
      let self = this;
      expect(this.module.checkpoint(true, 'no error')).toEqual(jasmine.any(Object));
      expect(() => this.module.checkpoint(false, 'error')).toThrow(new Error('error'));
      done();
    });
  });

  describe('standardizeReqOpts', function () {
    it ('response', function (done) {
      let self = this;
      let response = this.module.standardizeReqOpts({});

      expect(response).toEqual(jasmine.objectContaining({
        prime : jasmine.any(Function),
        finalize : jasmine.any(Function)
      }));

      done();
    });
  });

  describe('PromiseManager', function () {
    it ('response', function (done) {
      let self = this;
      let response = this.module.PromiseManager.prototype;

      expect(response).toEqual(jasmine.objectContaining({
        manage : jasmine.any(Function),
        lookup : jasmine.any(Function),
        resolve : jasmine.any(Function),
        reject : jasmine.any(Function)
      }));

      done();
    });
  });
});
