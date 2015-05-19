
var gulp = require('gulp');
var run = require('run-sequence');

require('./gulp/scripts');
require('./gulp/styles');
require('./gulp/templates');

gulp.task('default', function() {
  run('scripts',
    'styles',
    'templates');
});
