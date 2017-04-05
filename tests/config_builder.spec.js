'use strict';

const mockery = require('mockery');
const co = require('co');
const _ = require('lodash');

describe('config_builder', function () {
  beforeEach( function () {
    this.module = require('../lib/config_builder.js');

    mockery.enable({
      useCleanCache: true,
      warnOnReplace: false,
      warnOnUnregistered: false
    });
  });

  afterEach(function () {
    mockery.disable();
  });

  describe('should export config', function () {
    it ('response', function (done) {
      let self = this;

      let mockConfig = {
        test : 'test',
        tester : 'tester'
      };

      let test = this.module(mockConfig);
      expect(test).toEqual(jasmine.any(Object));

      done();
    });
  });
});
