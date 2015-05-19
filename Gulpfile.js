
var gulp = require('gulp');
var run = require('run-sequence');

require('./gulp/coffee');
require('./gulp/scripts');
require('./gulp/styles');
require('./gulp/templates');

gulp.task('default', function() {
  run('coffee',
    'scripts',
    'styles',
    'templates');
});
