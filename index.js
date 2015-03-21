'use strict';

var es6Transpiler = require("es6-transpiler");

function ES6Transpiler(config) {
  if (config == null) config = {};
  var options = config.plugins && config.plugins.es6Transpiler;
  this.options = options ? extend({}, options) : {};
  this.options.fromString = true;
  this.options.sourceMaps = !!config.sourceMaps;
}

ES6Transpiler.prototype.brunchPlugin = true;
ES6Transpiler.prototype.type = 'javascript';
ES6Transpiler.prototype.extension = 'js';

ES6Transpiler.prototype.compile = function(params, callback) {

  this.options.src = params.data;

  var compiled;
  try {
    compiled = es6Transpiler.run(this.options);
    if (compiled.errors.length > 0) {
      callback(compiled.errors);
    }
  } catch (err) {
    return callback(err);
  }
  var result = {
    data: compiled.src || compiled
  };
  callback(null, result);
}


module.exports = ES6Transpiler;
