/* jshint mocha:true */
'use strict';

var assert = require('assert');
var Plugin = require('./');

describe('Plugin', function() {
  var plugin;

  beforeEach(function() {
    plugin = new Plugin({});
  });

  it('should be an object', function() {
    assert(plugin);
  });

  it('should have #compile method', function() {
    assert.equal(typeof plugin.compile, 'function');
  });

  it('should compile and produce valid result', function(done) {
    var content = 'var c = {}; var {a, b} = c;';
    var expected = 'var c = {}; var a = c.a, b = c.b;';

    plugin.compile({
      data: content,
      path: 'file.js'
    }, function(error, result) {
      assert(!error);
      assert(result.data.indexOf(expected) !== -1);
      done();
    });
  });
});
