var gulp         = require('gulp'),
    concat       = require('gulp-concat'),
    rename       = require('gulp-rename'),
    uglify       = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    concatCss    = require('gulp-concat-css'),
    cssnano      = require('gulp-cssnano'),
    livereload   = require('gulp-livereload');

// Autoprefix, Concat, & Minify CSS
gulp.task('css', function() {
  return gulp.src('css/*.css')
  .pipe(concatCss('all.css'))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('dist'))
  .pipe(rename('all.min.css'))
  .pipe(cssnano())
  .pipe(gulp.dest('dist'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src('js/*.js')
  .pipe(concat('all.js'))
  .pipe(gulp.dest('dist'))
  .pipe(rename('all.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('css/*.css', ['css']);
});

// Default Task
gulp.task('default', ['css', 'scripts', 'watch']);
