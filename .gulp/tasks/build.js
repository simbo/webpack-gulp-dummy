'use strict';

module.exports = [

  'full build',

  function(done) {
    this.runSequence(
      ['clean'],
      ['build:js'],
      done
    );
  }

];
