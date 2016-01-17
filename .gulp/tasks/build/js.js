'use strict';

var path = require('path');

var glob = require('glob'),
    webpack = require('webpack');

module.exports = [

  'bundle javascripts via webpack',

  function(done) {

    var plug = this;

    function webpackDone(err, stats) {
      if (err) throw new plug.util.PluginError('webpack', err);
      plug.util.log('[webpack]', stats.toString({
        colors: true,
        timings: true
      }));
      done();
    }

    glob('*.js', {cwd: plug.paths.js.src}, function(err, files) {
      if (err) throw new plug.util.PluginError('glob', err);

      var compiler = webpack({

        entry: files
          .reduce(function(entries, file) {
            var fileName = path.join(path.dirname(file), path.basename(file, path.extname(file)));
            entries[fileName] = path.join(plug.paths.js.src, file);
            return entries;
          }, {}),

        output: {
          path: plug.paths.js.dest,
          filename: '[name].js'
        },

        module: {
          preLoaders: [{
            test: /\.jsx?$/,
            loaders: ['eslint'],
            include: plug.paths.js.src
          }]
        },

        resolve: {
          root: [
            plug.paths.js.src
          ]
        },

        devtool: 'source-map',

        plugins: plug.env === 'development' ? [
        ] : [
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            }
          })
        ],

        eslint: {
          failOnError: plug.env === 'production'
        }

      });

      if (plug.watch === true) {
        compiler.watch({
          aggregateTimeout: 300,
          poll: 100
        }, webpackDone);
      } else {
        compiler.run(webpackDone);
      }

    });

  }

];
