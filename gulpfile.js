'use strict';
    
// Include gulp
const gulp = require('gulp');

// Include Our Plugins
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const uglifyjs = require('uglify-es');
const composer = require('gulp-uglify/composer');
const pump = require('pump');
const {src, task} = require('gulp');
const eslint = require('gulp-eslint');

var minify = composer(uglifyjs, console);

// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
  return gulp.src('./src/sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./dist/css'))
      .pipe(browserSync.stream());
});

// Live-reloading with Browser Sync
gulp.task('browser-sync', function() {
  browserSync.init({
      proxy: "yourlocal.dev"
  });
});

// Minify JavaScript with UglifyJS3.
gulp.task('handleJs', function (cb) {
  var options = {};

  pump([
      gulp.src('src/scripts/app.js'),
      minify(options),
      gulp.dest('dist/scripts')
    ],
    cb
  );
});

//Eslint
gulp.task('lint', function () {
  return gulp.src(["./src/scripts/*.js"])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


// Default task
gulp.task('default', function() {
  browserSync.init({
    server: "./dist"
  });
  gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
  gulp.watch('src/scripts/app.js', gulp.series('handleJs'));
  gulp.watch('src/scripts/*.js', gulp.series('lint'));
  gulp.watch("dist/**/*").on('change', browserSync.reload);
});
