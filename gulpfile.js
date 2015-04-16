var gulp = require('gulp');
var run = require('run-sequence');

var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

var sass = require('gulp-ruby-sass');
var minifycss = require('gulp-minify-css');

var jshint = require('gulp-jshint');
var coffeelint = require('gulp-coffeelint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
 
gulp.task('browsercoffee', function () {
  return gulp.src('./core/config/core.coffee', { read: false })
             .pipe(browserify({ transform: ['coffeeify'], extensions: ['.coffee'] }))
             .pipe(concat('core.js'))
             .pipe(gulp.dest('./core/js'));
});

gulp.task('lint', function() {
  return gulp.src([
    'core/js/*.js'
  ])
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('default'));
});

gulp.task('coffeelint', function() {
  return gulp.src([
    'core/coffee/*.coffee'
  ])
  .pipe(coffeelint())
  .pipe(coffeelint.reporter());
});

gulp.task('sass', function() {
  return sass('./core/scss/core.scss')
    .pipe(minifycss())
    .pipe(gulp.dest('./core/css/'))
});

gulp.task('uglify-scripts', function() {
  return gulp.src([
  	'core/js/*'
  ])
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('core/js/'));
});

gulp.task('default', function() {
  run('coffeelint', 'browsercoffee', 'uglify-scripts', 'sass');
});
