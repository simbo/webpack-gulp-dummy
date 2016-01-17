'use strict';

module.exports = [

  'full build',

  function(done) {
    this.runSequence(
      ['watch:js'],
      done
    );
  }

];
