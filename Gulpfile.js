var gulp = require('gulp');
var run = require('run-sequence');
var rimraf = require('rimraf');

var scripts = require('./gulp/scripts');
var styles = require('./gulp/styles');
var templates = require('./gulp/templates');
var rimraf = require('rimraf');

function init(environment) {
  scripts(environment);
  styles(environment);
  templates(environment);
}

gulp.task('clean-target', function(cb) {
  return rimraf('target', cb);
});

gulp.task('clean-build', function(cb) {
  return rimraf('build', cb);
});

gulp.task('development', function() {
  var environment = 'development';
  process.env.NODE_ENV = environment;
  init(environment);
  run('scripts',
    'styles',
    'templates');
});

gulp.task('default', function() {
  var environment = 'production';
  process.env.NODE_ENV = environment;
  init(environment);
  run('clean-target',
    'clean-build',
    'scripts',
    'styles',
    'templates');
});
