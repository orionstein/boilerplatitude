var gulp = require('gulp');
var run = require('run-sequence');
var del = require('del');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

/* REGION Cleanup and file deletion */
gulp.task('clean-scripts', function(cb) {
  del([
    './target/js/*.js'
  ], cb);
});
/* ENDREGION */

/* REGION Javascript validation, minification and concatenation */
gulp.task('lint', function() {
  return gulp.src([
    'target/js/*.js'
  ])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

gulp.task('uglify-scripts', function() {
  return gulp.src([
    'target/js/*'
  ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('target/js/'));
});

gulp.task('scripts', function() {
  run('clean-scripts',
	  'uglify-scripts');
});
/* ENDREGION */
