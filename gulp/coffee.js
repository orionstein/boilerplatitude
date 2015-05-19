var gulp = require('gulp');
var run = require('run-sequence');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var coffeelint = require('gulp-coffeelint');

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

gulp.task('coffee', function() {
  run('coffeelint',
    'browsercoffee');
});
/* ENDREGION */
