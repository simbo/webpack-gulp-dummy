'use strict';

var path = require('path');

var gulp = require('gulp'),
    Plug = require('gulpplug');

var plug = new Plug(gulp, {
  tasksDir: '.gulp/tasks'
});

// set paths
plug.paths = (function(paths) {
  paths.cwd = __dirname;
  paths.src = path.join(paths.cwd, 'src');
  paths.dest = path.join(paths.cwd, 'dest');
  paths.assets = {
    src: path.join(paths.src, 'assets'),
    dest: path.join(paths.dest, 'assets')
  };
  paths.js = {
    src: path.join(paths.assets.src, 'js'),
    dest: path.join(paths.assets.dest, 'js')
  };
  paths.css = {
    src: path.join(paths.assets.src, 'styl'),
    dest: path.join(paths.assets.dest, 'css')
  };
  return paths;
})({});

// set environment
plug.env = ['development', 'production']
    .indexOf(process.env.NODE_ENV) !== -1 ?
        process.env.NODE_ENV : 'production';

// display env
plug.util.log('Environment: ' + plug.util.colors.yellow(plug.env));

// gulpplugging...
plug.loadPlugins()
  .addTasks()
  .addHelpTask()
  .addSequence('build', ['clean', 'build:js'])
  .addSequence('clean', ['clean:js'])
  .addSequence('watch', ['watch:js']);
