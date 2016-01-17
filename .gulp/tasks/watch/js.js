'use strict';

module.exports = [

  'watch javascripts via webpack-stream',

  function(done) {
    this.watch = true;
    this.runSequence('clean:js', 'build:js', done);
  }

];
