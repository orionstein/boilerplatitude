module.exports = function(environment) {
  'use strict';
  var gulp = require('gulp');
  var run = require('run-sequence');
  var del = require('del');
  var sass = require('gulp-ruby-sass');
  var minifycss = require('gulp-minify-css');
  var rename = require('gulp-rename');
  var scsslint = require('gulp-scss-lint');


  /* REGION Cleanup and file deletion */
  gulp.task('clean-styles', function(cb) {
    return del([
      './target/css/*.css'
    ], cb);
  });
  /* ENDREGION */

  /* REGION Html and Template Building */
  gulp.task('scss-lint', function() {
    return gulp.src([
      'core/scss/*.scss'
    ])
      .pipe(scsslint());
  });

  gulp.task('sass', function() {
    return sass('./core/scss/core.scss')
      .pipe(gulp.dest('./target/css/'));
  });


  gulp.task('minify-css', function() {
    return gulp.src(['./target/css/*.css'])
      .pipe(minifycss())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('target/css/'));
  });

  gulp.task('styles', function() {
    return run('clean-styles',
      'scss-lint',
      'sass',
      'minify-css');
  });
/* ENDREGION */
};
