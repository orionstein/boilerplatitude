var gulp = require('gulp');
var run = require('run-sequence');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var coffeelint = require('gulp-coffeelint');

/* REGION Cleanup and file deletion */
gulp.task('clean-scripts', function(cb) {
  return del([
    './target/js/*.js'
  ], cb);
});
/* ENDREGION */

/* REGION Coffeescript validation and conversion */
gulp.task('coffeelint', function() {
  return gulp.src([
    'core/coffee/*.coffee'
  ])
    .pipe(coffeelint())
    .pipe(coffeelint.reporter('default'));
});

gulp.task('browsercoffee', function() {
  return gulp.src('./core/config/core.coffee', {
    read: false
  })
    .pipe(browserify({
      transform: ['coffeeify'],
      extensions: ['.coffee']
    }))
    .pipe(concat('core.js'))
    .pipe(gulp.dest('./target/js'));
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
  return run('clean-scripts',
    'coffeelint',
    'browsercoffee',
    'uglify-scripts');
});
/* ENDREGION */
