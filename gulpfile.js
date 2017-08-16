const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
// var browserify = require('browserify');
// var babelify = require('babelify');
// var source = require('vinyl-source-stream');

gulp.task('transform', () => gulp.src('./src/**/*.{js,jsx}')
  .pipe(babel())
  .pipe(gulp.dest('./dist/')));

gulp.task('copy-index', () => gulp.src('./src/index.html')
  .pipe(gulp.dest('./dist')));

gulp.task('style', () => gulp.src('./src/sass/main.scss')
  .pipe(sass())
  .pipe(gulp.dest('./dist')));

gulp.task('watch', () => {
  gulp.watch('./src/**/*.scss', ['style']);
  gulp.watch('./src/**/*.{js,jsx}', ['transform']);
  gulp.watch('./src/index.html', ['copy-index']);
});

gulp.task('default', ['transform', 'copy-index', 'style']);
