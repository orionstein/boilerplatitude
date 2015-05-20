
var gulp = require('gulp');
var run = require('run-sequence');

var scripts = require('./gulp/scripts');
var styles = require('./gulp/styles');
var templates = require('./gulp/templates');

function init(environment){
  scripts(environment);
  styles(environment);
  templates(environment);
};


gulp.task('development', function() {
  var environment = 'development';
  init(environment);
  run('scripts',
    'styles',
    'templates');
});

gulp.task('default', function() {
  var environment = 'production';
  init(environment);
  run('scripts',
    'styles',
    'templates');
});

