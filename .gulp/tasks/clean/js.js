'use strict';

var clean = require('../../modules/clean');

module.exports = [

  'delete generated js',

  function(done) {
    clean.apply(this, [this.paths.js.dest, done]);
  }

];
