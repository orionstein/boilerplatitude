var gulp = require('gulp');
var path = require('path');

var run = require('run-sequence');

var del = require('del');

var minifyHTML = require('gulp-minify-html');

var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

var sass = require('gulp-ruby-sass');
var minifycss = require('gulp-minify-css');

var jshint = require('gulp-jshint');
var coffeelint = require('gulp-coffeelint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('templates', function() {
  gulp.src('./core/**/*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('./target'));
  gulp.src('./features/**/*.template')
    .pipe(minifyHTML())
    .pipe(gulp.dest('./target/partials'));
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

gulp.task('clean-files', function(cb) {
  del([
    './target/js/*.js',
    './target/css/*.css',
    './target/partials/**/**/*.template',
    './target/partials/**/*.template',
    './target/views/*'
  ], cb);
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

gulp.task('copy-index', function() {
  gulp.src('./core/views/index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('target/'));
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

gulp.task('default', function() {
  run('coffeelint',
    'clean-files',
    'browsercoffee',
    'uglify-scripts',
    'sass',
    'minify-css',
    'templates',
    'copy-index');
});
