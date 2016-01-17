'use strict';

/**
 * in comparison, same task using browserify and watchify:
 * https://github.com/simbo/nodejazz/blob/17af5beadf1f4b9f771fdc1dc9f5626bd3c3c9fe/.gulp/tasks/build/js.js
 */

var path = require('path');

var vinylNamed = require('vinyl-named'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream');

module.exports = [

  'bundle javascripts via webpack-stream',

  function() {
    return this.gulp
      .src(path.join(this.paths.js.src, '*.js'))
      .pipe(this.watch === true ? this.plugins.plumber({
        errorHandler: function() {}
      }) : this.util.noop())
      .pipe(vinylNamed())
      .pipe(webpackStream({
        module: {
          preLoaders: [{
            test: /\.jsx?$/,
            loaders: ['eslint'],
            include: this.paths.js.src
          }]
        },
        resolve: {
          root: this.paths.js.src
        },
        devtool: 'source-map',
        plugins: this.env === 'development' ? [
        ] : [
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: this.env === 'development'
            }
          })
        ],
        eslint: {
          failOnError: this.env === 'production' && this.watch !== true
        },
        watch: this.watch === true,
        watchOptions: {
          aggregateTimeout: 300,
          poll: 100
        }
      }, webpack, function(err, stats) {
        if (err) throw new this.util.PluginError('webpack', err);
        this.util.log('[webpack]', stats.toString({
          colors: true,
          timings: true
        }));
      }.bind(this)))
      .pipe(this.gulp.dest(this.paths.js.dest));
  }

];
