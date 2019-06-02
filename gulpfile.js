'use strict';
    
// Include gulp
const gulp = require('gulp');

// Include Our Plugins
const sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

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

// Watch Sass & Serve
gulp.task('default', function() {
  browserSync.init({
    server: "./dist"
  });
  gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
  gulp.watch("dist/**/*").on('change', browserSync.reload);
});
