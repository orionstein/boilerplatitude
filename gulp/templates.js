var gulp = require('gulp');
var run = require('run-sequence');
var del = require('del');
var minifyHTML = require('gulp-minify-html');
var htmltidy = require('gulp-htmltidy');
var tidyOptions = {
  doctype: 'html5',
  hideComments: true,
  indent: false
};

/* REGION Cleanup and file deletion */
gulp.task('clean-templates', function(cb) {
  return del([
    './target/partials/**/**/*.template',
    './target/partials/**/*.template',
    './target/views/*'
  ], cb);
});
/* ENDREGION */

/* REGION Html and Template Building */
gulp.task('build-templates', function() {
  gulp.src('./core/**/*.html')
    .pipe(htmltidy(tidyOptions))
    .pipe(minifyHTML())
    .pipe(gulp.dest('./target'));
  gulp.src('./features/**/*.template')
    .pipe(htmltidy(tidyOptions))
    .pipe(minifyHTML())
    .pipe(gulp.dest('./target/partials'));
});

gulp.task('copy-index', function() {
  return gulp.src('./core/views/index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('target/'));
});

gulp.task('templates', function() {
  return run('clean-templates',
    'build-templates',
    'copy-index');
});
/* ENDREGION */
