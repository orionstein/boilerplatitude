module.exports = function(environment) {
  'use strict';
  var gulp = require('gulp');
  var run = require('run-sequence');
  var minifyHTML = require('gulp-minify-html');
  var htmltidy = require('gulp-htmltidy');
  var preprocess = require('gulp-preprocess');
  var rimraf = require('rimraf');
  var config = require('../package.json');
  var tidyCoreOptions = {
    doctype: 'html5',
    hideComments: true,
    indent: false,
	'new-empty-tags': 'ui-view'
  };
  var tidyPartialOptions = {
    doctype: 'html5',
    hideComments: true,
    indent: false,
	'show-body-only': true,
	'new-empty-tags': 'ui-view'
  };

  /* REGION Cleanup and file deletion */
  gulp.task('clean-views', function(cb) {
    return rimraf('target/views', cb);
  });

  gulp.task('clean-partials', function(cb) {
    return rimraf('target/partials', cb);
  });
  /* ENDREGION */

  /* REGION Html and Template Building */
  gulp.task('build-templates-core', function() {
    return gulp.src('./core/**/*.html')
      .pipe(preprocess({
        context: {
          SCRIPT_FILES: config.script_files.toString()
        }
      }))
      .pipe(htmltidy(tidyCoreOptions))
      .pipe(minifyHTML())
      .pipe(gulp.dest('./target'));
  });

  gulp.task('build-templates-features', function() {
    return gulp.src('./features/**/*.html')
      .pipe(preprocess())
      .pipe(htmltidy(tidyPartialOptions))
      .pipe(minifyHTML())
      .pipe(gulp.dest('./target/partials'));
  });

  gulp.task('copy-index', function() {
    return gulp.src('target/views/index.html')
      .pipe(gulp.dest('target/'));
  });

  gulp.task('templates', function() {
    return run('clean-views',
      'clean-partials',
      'build-templates-core',
      'build-templates-features',
      'copy-index');
  });
/* ENDREGION */
};
