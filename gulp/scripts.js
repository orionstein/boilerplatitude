module.exports = function(environment) {
  'use strict';
  var gulp = require('gulp');
  var run = require('run-sequence');
  var jshint = require('gulp-jshint');
  var uglify = require('gulp-uglify');
  var rename = require('gulp-rename');
  var del = require('del');
  var browserify = require('gulp-browserify');
  var concat = require('gulp-concat');
  var coffeelint = require('gulp-coffeelint');
  var preprocess = require('gulp-preprocess');
  var rimraf = require('rimraf');

  /* REGION Cleanup and file deletion */
  gulp.task('clean-scripts', function(cb) {
    return del([
      'target/js/*.js'
    ], cb);
  });
  /* ENDREGION */

  /* REGION Cleanup and file deletion */
  gulp.task('clean-temp', function(cb) {
    return rimraf('build', cb);
  });
  /* ENDREGION */

  /* REGION Coffeescript validation and conversion */
  gulp.task('coffeelint', function() {
    return gulp.src([
      'build/core/**/*.coffee',
      'build/features/*.coffee',
      'build/features/**/*.coffee',
      'build/features/**/**/*.coffee'
    ])
      .pipe(coffeelint())
      .pipe(coffeelint.reporter('default'));
  });

  gulp.task('preproc-core', function() {
    return gulp.src([
      'core/**/*.coffee'
    ])
      .pipe(preprocess({
        context: process.env
      }))
      .pipe(gulp.dest('build/core'));
  });
  
  gulp.task('preproc-features', function() {
    return gulp.src([
      'features/*.coffee',
      'features/**/*.coffee',
      'features/**/**/*.coffee'
    ])
      .pipe(preprocess({
        context: process.env
      }))
      .pipe(gulp.dest('build/features'));
  });

  gulp.task('browsercoffee', function() {
    return gulp.src('build/core/config/core.coffee', {
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
    return run('coffeelint',
      'clean-scripts',
      'clean-temp',
      'preproc-core',
	  'preproc-features',
      'browsercoffee',
      'uglify-scripts',
      'clean-temp');
  });
/* ENDREGION */
};
