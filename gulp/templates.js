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
  del([
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
  gulp.src('./core/views/index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('target/'));
});

gulp.task('templates', function() {
  run('build-templates',
    'copy-index');
});
/* ENDREGION */