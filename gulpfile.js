var gulp         = require('gulp'),
    concat       = require('gulp-concat'),
    rename       = require('gulp-rename'),
    uglify       = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    concatCss    = require('gulp-concat-css'),
    cssnano      = require('gulp-cssnano'),
    imagemin     = require('gulp-imagemin'),
    connect      = require('gulp-connect');

// Autoprefix, Concat, & Minify CSS
gulp.task('css', function() {
  return gulp.src('css/*.css')
  .pipe(concatCss('all.css'))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(cssnano())
  .pipe(gulp.dest('dist/css'))
  .pipe(rename('all.min.css'))
  .pipe(gulp.dest('dist/css'))
  .pipe(connect.reload());
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src('js/*.js')
  .pipe(concat('all.js'))
  .pipe(gulp.dest('dist/js'))
  .pipe(rename('all.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'));
});

// Minify Images
gulp.task('images', function() {
  return gulp.src('images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'));
});

// Connect to livereload
gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('css/*.css', ['css']);
});

// Default Task
gulp.task('default', ['css', 'scripts', 'images', 'watch', 'connect']);
